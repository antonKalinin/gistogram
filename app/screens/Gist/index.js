/**
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux';
import Markdown from 'react-native-easy-markdown';
import GhIcon from 'react-native-vector-icons/Octicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';

import {toggleEditingMode} from '../../actions';
import Loading from '../../components/Loading';
import GradientContainer from '../../components/GradientContainer';

import styles from './styles';


class Gist extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this._editGist = this._editGist.bind(this);
    }

    componentDidMount() {
        const {dispatch, navigation, gist} = this.props;
        const {gist: nextGist} = navigation.state.params || {gist: {}};
    }

    _editGist() {
        const {dispatch, navigation} = this.props;
        dispatch(toggleEditingMode(true));
        navigation.navigate('GistEditor');
    }

    _renderMarkdown(markdown, key) {
        return (
            <Markdown key={key}>
                {markdown.trim().replace(/\n/g, '\n\n')}
            </Markdown>
        );
    }

    /*_renderSyntax(file, key) {
        return (
            <SyntaxHighlighter
                key={key}
                language={file.language}
                style={github}
                highlighter="hljs"
            >
                {file.content}
            </SyntaxHighlighter>
        );
    }*/

    render() {
        const {gist, navigation} = this.props;

        return (
            <GradientContainer>
                <View style={styles.header}>
                    <View style={styles.headerControls}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack(); }}
                            style={styles.headerButton}
                        >
                            <MdIcon name="arrow-back" size={30} color="#FFF" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._editGist}
                            style={styles.headerButton}
                        >
                            <Text style={styles.headerButtonText}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    {gist &&
                        <View style={styles.info}>
                            <Text style={styles.title}>
                                {gist.description}
                            </Text>
                            <View style={styles.attributes}>
                                <Text style={styles.date}>
                                    {Moment(gist.created_at).format('DD MMMM, YYYY')}
                                </Text>
                                {gist.public === false &&
                                    <GhIcon
                                        style={styles.secretIcon}
                                        name="lock" size={16} color="#FFF"
                                    />
                                }
                                <Text style={styles.secret}>
                                    {gist.public ? 'Public' : 'Secret'}
                                </Text>
                            </View>
                        </View>
                    }
                </View>
                {gist &&
                    <ScrollView style={styles.content}>
                        {
                            Object.keys(gist.files).map((fileName) => {
                                const file = gist.files[fileName];

                                if (file && file.language === 'Markdown') {
                                    return this._renderMarkdown(file.content, gist.id);
                                }

                                return <Text>{file.content}</Text>; // this._renderSyntax(file, gist.id);
                            })
                        }
                    </ScrollView>
                }
                {!gist && <Loading />}
            </GradientContainer>
        );
    }
}

export default connect(state => ({
    gist: state.gists.current,
}))(Gist);


