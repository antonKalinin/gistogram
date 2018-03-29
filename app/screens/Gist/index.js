/**
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, WebView, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import Markdown from 'react-native-easy-markdown';
import GhIcon from 'react-native-vector-icons/Octicons';
import MdIcon from 'react-native-vector-icons/MaterialIcons';
import marked from 'marked';
import Moment from 'moment';

import {toggleEditingMode} from '../../actions';
import Loading from '../../components/Loading';
import GradientContainer from '../../components/GradientContainer';

import styles from './styles';

const htmlWrap = html =>
    `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" />
            <style>
                html, body {
                    height: 100%;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <div class="markdown-body">${html}</div>
        </body>
    </html>
    `;

class Gist extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this._editGist = this._editGist.bind(this);
    }

    /* componentWillReceiveProps(nextProps) {
        const {gist} = this.state;

        if (nextProps.gist !== gist) {
            this.setState({gist: nextProps.gist});
        }
    } */

    _editGist() {
        const {dispatch, navigation} = this.props;
        dispatch(toggleEditingMode(true));
        navigation.navigate('GistEditor');
    }

    _renderMarkdown(markdown, key) {
        return (
            <WebView
                key={key}
                style={{}}
                scalesPageToFit={false}
                source={{
                    html: htmlWrap(
                        marked(markdown.trim().replace(/\n/g, '\n\n'))
                    ),
                }}
            />
        );
    }

    render() {
        const {navigation, gist} = this.props;

        return (
            <GradientContainer>
                <View style={styles.header}>
                    <View style={styles.headerControls}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
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
                    {gist && (
                        <View style={styles.info}>
                            <Text style={styles.title}>{gist.description}</Text>
                            <View style={styles.attributes}>
                                <Text style={styles.date}>
                                    {Moment(gist.created_at).format(
                                        'DD MMMM, YYYY'
                                    )}
                                </Text>
                                {gist.public === false && (
                                    <GhIcon
                                        style={styles.secretIcon}
                                        name="lock"
                                        size={16}
                                        color="#FFF"
                                    />
                                )}
                                <Text style={styles.secret}>
                                    {gist.public ? 'Public' : 'Secret'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
                {gist && (
                    <View style={styles.content}>
                        {Object.keys(gist.files).map(fileName => {
                            const file = gist.files[fileName];

                            if (file && file.language === 'Markdown') {
                                return this._renderMarkdown(
                                    file.content,
                                    gist.id
                                );
                            }

                            return (
                                <Text key={file.filename} style={styles.text}>
                                    {file.content}
                                </Text>
                            );
                        })}
                    </View>
                )}
                {!gist && <Loading />}
            </GradientContainer>
        );
    }
}

export default connect(state => ({
    gist: state.gists.current,
}))(Gist);
