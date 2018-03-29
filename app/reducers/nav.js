import {AppNavigation} from '../Navigation';

const initialState = AppNavigation.router.getStateForAction(
    AppNavigation.router.getActionForPathAndParams('GistList')
);

export default (state = initialState, action) => {
    const nextState = AppNavigation.router.getStateForAction(action, state);

    return nextState || state;
};
