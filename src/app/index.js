import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './containers/GameContainer'
import { Provider } from 'react-redux';
import configureStore from './configureStore'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <GameContainer/>
    </Provider>,
    document.getElementById('root')

);
