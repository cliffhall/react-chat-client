import React from 'react';
import ReactDOM from 'react-dom';
import Client from './components/Client'
import { Provider } from 'react-redux';
import store from './store';

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <Client/>
        </Provider>,
        document.getElementById('app')
    )
}
render();