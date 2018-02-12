/**
 * @flow
 */

import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import {connect} from 'react-redux';
import GhIcon from 'react-native-vector-icons/Octicons';

import ShadowButton from '../../components/ShadowButton';
import GradientContainer from '../../components/GradientContainer';
import {authorize} from '../../actions';
import styles from './styles';


class Welcome extends Component<{}> {
    static navigationOptions = {
        header: null,
    };

    componentWillReceiveProps(nextProps) {
        const {navigation} = this.props;

        if (nextProps.authorized) {
            navigation.navigate('GistList');
        }
    }

    _authorize = () => {
        const {dispatch, authorized} = this.props;

        if (!authorized) {
            dispatch(authorize());
        }
    }

    render() {
        return (
            <GradientContainer>
                <View style={styles.container}>
                    <Text style={styles.title}>Hi!</Text>
                    <View style={styles.about}>
                        <Text style={styles.aboutText}>
                            Gistogram is simple way to create and view markdown notes
                            and store them as GitHub Gists.
                        </Text>
                    </View>
                    {//<GhIcon name="logo-gist" color="#FFF" size={40} />
                    /*<GhIcon name="logo-github" color="#FFF" size={60} />*/}
                    <View style={styles.footer}>
                        <ShadowButton onPress={this._authorize}>
                            Login with GitHub
                        </ShadowButton>
                    </View>
                </View>

            </GradientContainer>
        );
    }
}

export default connect(state => ({
    authorized: state.user.authorized,
}))(Welcome);
