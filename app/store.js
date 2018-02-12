import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

// lets us dispatch() functions
const enhancer = composeWithDevTools({})(applyMiddleware(thunkMiddleware));

export default function configureStore() {
    return createStore(reducers, enhancer);
}
