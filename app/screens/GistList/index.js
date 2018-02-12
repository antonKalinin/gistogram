/**
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

import ShadowButton from '../../components/ShadowButton';
import GradientContainer from '../../components/GradientContainer';

import {
    fetchGist,
    deleteGist,
    addNotification,
    toggleEditingMode,
    removeNotification,
} from '../../actions';

import styles from './styles';

Moment.locale('en');

const selectors = {
    public: (item) => item.public === true,
    secret: (item) => item.public === false,
    markdown: (item) => item.files && Object.keys(item.files)
        .find((fileName) => item.files[fileName].language === 'Markdown'),
};

const EditGistButton = () => (
    <View style={styles.editGistButton}>
        <MdIcon name="edit" size={24} color="#FFF" />
    </View>
);

const DeleteGistButton = () => (
    <View style={styles.deleteGistButton}>
        <MdIcon name="delete" size={24} color="#FFF" />
    </View>
);

class GistList extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.gistsLenght = 0;

        this._renderItem = this._renderItem.bind(this);
        this._navigateToNewGist = this._navigateToNewGist.bind(this);
    }

    _keyExtractor = (item, index) => item.id;

    _deleteGist(id) {
        const {dispatch} = this.props;

        dispatch(addNotification({text: 'Deleting...', duration: 10000}));
        dispatch(deleteGist(id)).then(() => {
            dispatch(removeNotification());
        });
    }

    _renderItem({item, index}) {
        const {dispatch, navigation} = this.props;
        const title = item.description
            ? item.description
            : Object.keys(item.files)[0];

        const swipeBtns = [
            {
                component: <DeleteGistButton/>,
                onPress: () => { this._deleteGist(item.id); },
            },
            {
                component: <EditGistButton/>,
                onPress: () => {
                    dispatch(toggleEditingMode(true));
                    navigation.navigate('GistEditor', {id: item.id});
                },
            },
        ];

        return (
            <Swipeout
                autoClose
                right={swipeBtns}
                style={[
                    styles.gistItem,
                    index === 0 && styles.gistItem_first,
                    index === (this.gistsLenght - 1) && styles.gistItem_last,
                ]}
                key={item.id}
            >
                <TouchableOpacity
                    style={{padding: 20}}
                    onPress={() => {
                        navigation.navigate('Gist', {gist: item});
                        dispatch(fetchGist(item.id));
                    }}
                >
                    <Text style={styles.gistItemTitle}>
                        {title}
                    </Text>
                    <View style={styles.gistItemFooter}>
                        <Text style={styles.gistItemCreatedAt}>
                            {Moment(item.created_at).format('DD MMMM')}
                        </Text>
                        <Text style={styles.gistItemVisibility}>
                            {item.public ? 'Public' : 'Secret'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }

    _navigateToNewGist() {
        const {dispatch, navigation} = this.props;

        dispatch(toggleEditingMode(false));
        navigation.navigate('GistEditor');
    }

    render() {
        const {gists, filters, navigation, gistsLoaded} = this.props;

        let filteredGists = gists;

        if (gists.length) {
            Object.entries(filters)
                .filter(([filter, enabled]) => enabled && selectors[filter])
                .forEach(([filter]) =>
                    filteredGists = filteredGists.filter(selectors[filter])
                );
        }

        this.gistsLenght = filteredGists.length;

        return (
            <GradientContainer>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => { navigation.navigate('DrawerOpen'); }}
                    >
                        <MdIcon name="menu" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        My gists
                    </Text>
                </View>
                {!gistsLoaded &&
                    <ActivityIndicator
                        style={styles.activityIndicator}
                        color="#fff"
                        size="large"
                    />
                }
                {filteredGists.length !== 0 &&
                    <FlatList
                        data={filteredGists}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        style={styles.gistList}
                    />
                }
                {gistsLoaded && filteredGists.length === 0 &&
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No gists found</Text>
                    </View>
                }
                <View style={styles.footer}>
                    <ShadowButton onPress={this._navigateToNewGist}>
                        NEW GIST
                    </ShadowButton>
                </View>
            </GradientContainer>
        );
    }
}

export default connect(state => ({
    gists: state.gists.list,
    filters: state.gists.filters,
    gistsLoaded: state.gists.listLoaded,
}))(GistList);


