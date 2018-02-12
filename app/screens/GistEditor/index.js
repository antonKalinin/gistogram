/**
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import GhIcon from 'react-native-vector-icons/Octicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';

import Loading from '../../components/Loading';
import MarkdownEditor from '../../components/MarkdownEditor';
import GradientContainer from '../../components/GradientContainer';

import {NavigationActions} from 'react-navigation';

import {
    editGist,
    fetchGist,
    createGist,
    addNotification,
    removeNotification,
} from '../../actions';

import styles from './styles';

const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({ routeName: 'GistList' }),
        NavigationActions.navigate({ routeName: 'Gist' }),
    ],
});

class GistEditor extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        const {editingMode, gist} = props;
        const gistFile = gist && gist.files && Object.values(gist.files)[0];

        this.state = {
            isSaving: false,
            isPublic: editingMode && gist ? gist.public : false,
            content: editingMode && gistFile ? gistFile.content : '',
            filename: editingMode && gistFile ? gistFile.filename : '',
            description: editingMode && gist ? gist.description : '',
        };

        this._getData = this._getData.bind(this);
        this._saveGist = this._saveGist.bind(this);
        this._togglePublic = this._togglePublic.bind(this);
    }

    componentDidMount() {
        const {dispatch, navigation, gist, editingMode} = this.props;
        const {id: gistId} = navigation.state.params || {id: null};

        if (editingMode && gistId && (!gist || (gist && gist.id !== gistId))) {
            dispatch(fetchGist(gistId));
        }
    }

    componentWillReceiveProps(nextProps) {
        const {editingMode, gist} = this.props;

        const nextState = {
            isPublic: false,
            content: '',
            filename: '',
            description: '',
        };

        if (nextProps.editingMode && nextProps.gist) {
            const gistFile = nextProps.gist && nextProps.gist.files && Object.values(nextProps.gist.files)[0];

            nextState.isPublic = nextProps.gist.public;
            nextState.content = gistFile ? gistFile.content : '';
            nextState.filename = gistFile ? gistFile.filename : '';
            nextState.description = nextProps.gist.description;
        }

        const needUpdate = !gist && nextProps.gist ||
            nextProps.gist && gist && nextProps.gist.id !== gist.id ||
            editingMode !== nextProps.editingMode;

        needUpdate && this.setState(nextState);
    }

    _togglePublic() {
        this.setState({isPublic: !this.state.isPublic});
    }

    _getData() {
        const {dispatch} = this.props;
        let {isPublic, content, filename, description} = this.state;

        [
            content,
            filename,
            description,
        ] = [content, filename, description].map(str => str.trim());

        if (!filename || !content || !description) {
            let message = 'Please, add ';

            if (!filename) {
                message += 'filename';
            } else if (!content) {
                message += 'gist body';
            } else {
                message += 'description';
            }

            dispatch(addNotification(message));

            return null;
        }

        return {
            description,
            public: isPublic,
            files: {
                [filename]: {
                    content,
                },
            },
        };
    }

    _saveGist() {
        const {gist, editingMode, dispatch, navigation} = this.props;
        const {isSaving} = this.state;
        const data = this._getData();

        if (isSaving) {
            return;
        }

        if (data) {
            this.setState({isSaving: true});

            dispatch(addNotification({text: 'Saving...', duration: 10000}));

            const saving = editingMode && gist && gist.id
                ? dispatch(editGist(gist.id, data))
                : dispatch(createGist(data));

            saving.then(() => {
                this.setState({isSaving: false});
                dispatch(removeNotification());

                navigation.dispatch(resetAction);
            });
        }
    }

    render() {
        const {navigation, isFetching} = this.props;
        const {
            isPublic,
            content,
            filename,
            description,
        } = this.state;

        return (
            <GradientContainer>
                {isFetching && <Loading />}
                {!isFetching &&
                    <View style={{flex: 1}}>
                        <View style={styles.header}>
                            <View style={styles.headerControls}>
                                <TouchableOpacity
                                    onPress={() => { navigation.goBack(); }}
                                    style={styles.headerButton}
                                >
                                    <MdIcon name="arrow-back" size={30} color="#FFF" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this._saveGist}
                                    style={styles.headerButton}
                                >
                                    <Text style={styles.headerButtonText}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                value={description}
                                style={styles.title}
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                placeholder="Gist description"
                                onChangeText={(description) => {
                                    this.setState({
                                        description,
                                        filename: `${description.replace(/\s/g, '_').toLowerCase()}.md`,
                                    });
                                }}
                            />
                            <View style={styles.params}>
                                <TouchableOpacity
                                    onPress={this._togglePublic}
                                    style={styles.visibilityButton}
                                >
                                    <GhIcon
                                        style={styles.secretIcon}
                                        name={isPublic ? 'eye' : 'lock'}
                                        size={16} color="#FFF"
                                    />
                                    <Text style={styles.visibilityButtonText}>
                                        {isPublic ? 'Public' : 'Secret'}
                                    </Text>
                                </TouchableOpacity>
                                <TextInput
                                    value={filename}
                                    autoCorrect={false}
                                    style={styles.filename}
                                    placeholderTextColor="rgba(8, 17, 45, 0.35)"
                                    placeholder="Filename.md"
                                    onChangeText={(filename) => { this.setState({filename}); }}
                                />
                            </View>
                        </View>
                        <View style={styles.form}>
                            <MarkdownEditor
                                value={content}
                                onChangeText={(content) => { this.setState({content}); }}
                            />
                        </View>
                    </View>
                }
            </GradientContainer>
        );
    }
}

export default connect(state => ({
    gist: state.gists.current,
    isFetching: state.gists.isFetching,
    editingMode: state.gists.editingMode,
}))(GistEditor);


