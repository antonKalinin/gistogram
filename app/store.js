import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import sagas from './sagas/index';

import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

const sagaMiddleware = createSagaMiddleware();

let navigationMiddleware = undefined;

if (Platform.OS !== 'web') {
    navigationMiddleware = createReactNavigationReduxMiddleware(
        'root',
        state => state.nav
    );
}
const enhancer = composeWithDevTools({})(
    applyMiddleware(thunkMiddleware, sagaMiddleware, navigationMiddleware)
);

export default createStore(reducers, enhancer);

sagaMiddleware.run(sagas);
