import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from './components/Client.js'

function render() {
    ReactDOM.render(
        React.createElement(Client),
        document.getElementById('app')
    )
}
render();
