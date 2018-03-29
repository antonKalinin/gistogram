/* @flow */
import React, {Component} from 'react';
import {BackHandler, Dimensions} from 'react-native';

import {
    StackNavigator,
    DrawerNavigator,
    NavigationActions,
    addNavigationHelpers,
} from 'react-navigation';

import {connect} from 'react-redux';
import {createReduxBoundAddListener} from 'react-navigation-redux-helpers';

import Drawer from './components/Drawer';

import Gist from './screens/Gist';
import GistEditor from './screens/GistEditor';
import GistList from './screens/GistList';

const {width} = Dimensions.get('window');

const StackNavigation = StackNavigator({
    Gist: {screen: Gist},
    GistEditor: {screen: GistEditor},
    GistList: {screen: GistList},
});

export const AppNavigation = DrawerNavigator(
    {
        Stack: {screen: StackNavigation},
    },
    {
        drawerWidth: width / 2,
        drawerPosition: 'right',
        contentComponent: Drawer,
    }
);

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.addListener = createReduxBoundAddListener('root');
        this.onBackPress = this.onBackPress.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;

        if (nav.routes[0].routes[0].index === 1) {
            return false;
        }

        dispatch(NavigationActions.back());

        return true;
    };

    render() {
        const {dispatch, nav} = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav,
            addListener: this.addListener,
        });

        return <AppNavigation navigation={navigation} />;
    }
}

export default connect(state => ({
    nav: state.nav,
}))(Navigation);
