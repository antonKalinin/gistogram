/**
 * @flow
 */

import React, { Component } from 'react';
import {
    View,
    StatusBar,
} from 'react-native';

import {connect} from 'react-redux';

import {
    fetchUser,
    fetchUserGists,
    fetchAccessToken,
    fetchFilter,
} from './actions';

import API from './API';
import Welcome from './screens/Welcome';
import Navigation from './Navigation';
import Notification from './components/Notification';

class App extends Component<{}> {
    constructor(props) {
        super(props);

        this.state = {
            checkingAuthorization: true,
        };

        API.errorHandler = (error) => {
            /*props.dispatch(addAlert({
                level: 'error',
                title: `Server error (${error.statusCode.toString()})`,
                ...error,
            }));*/

            console.log(error);
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;

        dispatch(fetchAccessToken())
            .then(() => {
                this.setState({checkingAuthorization: false});
            })
            .catch((error) => {
                this.setState({checkingAuthorization: false});
                console.log('Need to authorize');
            });
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch} = this.props;

        if (nextProps.authorized && !nextProps.user) {
            dispatch(fetchUser());
        }

        if (nextProps.user) {
            dispatch(fetchFilter()).then(() => {
                dispatch(fetchUserGists(nextProps.user.login));
            });
        }
    }

    render() {
        const {authorized} = this.props;
        const {checkingAuthorization} = this.state;

        return (
            <View>
                <StatusBar translucent />
                {!checkingAuthorization && !authorized && <Welcome />}
                {!checkingAuthorization && authorized && <Navigation />}
                <Notification />
            </View>
        );
    }
}

export default connect(state => ({
    user: state.user.info,
    authorized: state.user.authorized,
}))(App);