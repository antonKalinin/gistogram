import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';

import configureStore from './store';
import App from './App';

const Gistogram = () => (
    <Provider store={configureStore()}>
        <App />
    </Provider>
);

export default Gistogram;
