import { Client, Socket } from './Client.js'

function render() {
    ReactDOM.render(
        React.createElement(Client),
        document.getElementById('app')
    )
}
render();
