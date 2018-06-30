import { Client, Socket } from './Client.js'



//const onChange = () => socket.setState({'connected: true'});
//const socket = new Socket();

function render() {
    ReactDOM.render(
        React.createElement('div', {},
            React.createElement(Client, {})
        ),
        document.getElementById('app')
    )
}
render();
