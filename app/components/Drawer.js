import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import {applyFilter, deauthorize} from '../actions';
import type {DispatchType, NavigationType} from '../types';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(8, 17, 45, 0.75)',
    },
    avatar: {
        width: 80,
        height: 80,
        marginTop: 40,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    filters: {
        marginTop: 30,
    },
    filtersHeader: {
        flexDirection: 'row',
    },
    filtersTitle: {
        flex: 1,
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 20,
        marginBottom: 0,
    },
    filtersSaver: {
        marginRight: 20,
        opacity: 0.7,
    },
    filter: {
        paddingVertical: 15,
        paddingLeft: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#FFF',
    },
    filter_enabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    filterName: {
        color: '#FFF',
        fontSize: 16,
    },
    separator: {
        width: width / 2,
        marginTop: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#FFF',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 32,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logoutText: {
        color: '#FFF',
        fontSize: 16,
    },
});

type PropsType = {
    dispatch: DispatchType,
    navigation: NavigationType,
    screenProps: any,
    fastFilters: any,
    user: any,
};

class Drawer extends Component<PropsType> {
    constructor(props) {
        super(props);

        this.filters = [
            {
                title: 'Public',
                name: 'public',
            },
            {
                title: 'Secret',
                name: 'secret',
            },
            {
                title: 'Markdown Only',
                name: 'markdown',
            },
        ];

        this._logout = this._logout.bind(this);
        this._renderFilter = this._renderFilter.bind(this);
    }

    open() {
        this.props.navigation.navigate('DrawerOpen');
    }

    close() {
        this.props.navigation.navigate('DrawerOpen');
    }

    _logout() {
        this.props.dispatch(deauthorize());
    }

    _renderFilter(filter) {
        const {dispatch, filters} = this.props;
        const enabled = filters[filter.name];
        const nextFilters = {...filters, ...{[filter.name]: !enabled}};

        if (filter.name === 'public') {
            nextFilters.secret = false;
        }

        if (filter.name === 'secret') {
            nextFilters.public = false;
        }

        return (
            <TouchableOpacity
                key={filter.name}
                style={[styles.filter, enabled && styles.filter_enabled]}
                onPress={() => { dispatch(applyFilter(nextFilters)); }}
            >
                <Text style={[styles.filterName]}>
                    {filter.title}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        const {user} = this.props;

        if (!user) {
            return null;
        }

        return (
            <View style={styles.container}>
                <Image
                    source={{uri: user.avatar_url}}
                    style={styles.avatar}
                />
                <View style={styles.filters}>
                    <View style={styles.filtersHeader}>
                        <Text style={styles.filtersTitle}>Filters</Text>
                    </View>
                    <View style={styles.separator}></View>
                    {this.filters.map(this._renderFilter)}
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={this._logout}
                    >
                        <Text style={styles.logoutText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect(state => ({
    user: state.user.info,
    filters: state.gists.filters,
}))(Drawer);

