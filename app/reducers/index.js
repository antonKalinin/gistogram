import {combineReducers} from 'redux';

import ui from './ui';
import nav from './nav';
import user from './user';
import gists from './gists';

export default combineReducers({
    ui,
    nav,
    user,
    gists,
});
