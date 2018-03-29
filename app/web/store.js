import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools({})(
    applyMiddleware(thunkMiddleware, sagaMiddleware)
);

export default createStore(reducers, enhancer);

sagaMiddleware.run(sagas);
