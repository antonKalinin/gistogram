/**
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class App extends Component<{}> {
    render() {
        return (
            <View>
                <Text>Gistogram Mobile Web</Text>
            </View>
        );
    }
}

/* export default connect(state => ({
    user: state.user.info,
    authorized: state.user.authorized,
}))(App); */
