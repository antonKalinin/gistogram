import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import MdIcon from 'react-native-vector-icons/MaterialIcons';

import markitdown from './markitdown';

const styles = StyleSheet.create({
    container: { flex: 1 },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#EEE',
        borderTopColor: '#CECECE',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    toolbarSpacer: {
        width: 10,
        borderRightColor: '#CECECE',
        borderRightWidth: StyleSheet.hairlineWidth,
    },
    toolbarButton: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRightColor: '#CECECE',
        borderRightWidth: StyleSheet.hairlineWidth,
    },
    toolbarButton_first: {
        borderLeftColor: '#CECECE',
        borderLeftWidth: StyleSheet.hairlineWidth,
    },
    textInput: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
    },
});

const buttons = [
    { name: 'heading2', icon: 'format-size' },
    { name: 'bold', icon: 'format-bold' },
    { name: 'italic', icon: 'format-italic' },
    { name: 'spacer1' },
    { name: 'quote', icon: 'format-quote' },
    { name: 'link', icon: 'link' },
    { name: 'spacer2' },
    { name: 'bulleted-list', icon: 'format-list-bulleted' },
    { name: 'numbered-list', icon: 'format-list-numbered' },
    { name: 'check-list', icon: 'check-box' },
];

export default class MarkdownEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            selection: {start: 0, end: 0},
        };

        this._onChangeText = this._onChangeText.bind(this);
        this._renderButton = this._renderButton.bind(this);
        this._onSelectionChange = this._onSelectionChange.bind(this);
    }

    _applyMarkdown(name) {
        const {value, selection} = this.state;

        this.setState({value: markitdown(value, name, selection)});
    }

    _onChangeText(value) {
        const {onChangeText} = this.props;

        this.setState({value});

        if (typeof onChangeText === 'function') {
            onChangeText(value);
        }
    }

    _onSelectionChange(event) {
        this.setState({selection: event.nativeEvent.selection});
    }

    _renderButton(button, index) {
        if (button.name.indexOf('spacer') === 0) {
            return (<View key={button.name} style={styles.toolbarSpacer}></View>);
        }

        return (
            <TouchableOpacity
                key={button.name}
                onPress={() => { this._applyMarkdown(button.name); }}
                style={[styles.toolbarButton, index === 0 && styles.toolbarButton_first]}
            >
                <MdIcon name={button.icon} size={20} color="#777" />
            </TouchableOpacity>
        );
    }

    render() {
        const {value} = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    multiline
                    autoFocus
                    value={value}
                    style={styles.textInput}
                    placeholder="Gist content"
                    onChangeText={this._onChangeText}
                    onSelectionChange={this._onSelectionChange}
                />
                <View style={styles.toolbar}>
                    { buttons.map(this._renderButton) }
                </View>
                <KeyboardSpacer />
            </View>
        );
    }
}
