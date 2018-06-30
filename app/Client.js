// Styles
export const clientStyle = {
    display: 'inline-block',
    border: '1px solid #ACACAC',
    borderRadius: '2px',
    textAlign: 'right',
    backgroundColor: '#FCFCFC',
    color: '#ffb3cb',
    fontFamily: "'Lato', 'PT Sans', Helvetica, sans-serif",
}
export const buttonStyle = {
    backgroundColor: 'transparent',
    border: 0,
    borderTop: '1px solid #ff6796',
    fontSize: '10px',
    color: '#ffb3cb',
    padding: '5px',
    cursor: 'pointer',
}
export const recipientStyle = {
    fontSize: '12px',
    lineHeight: '12px',
    padding: '5px 5px 0',
    color: 'blue'};
export const senderStyle = {
    fontSize: '12px',
    lineHeight: '12px',
    padding: '5px 5px 0',
    color: 'orange'};
export const historyStyle = {
    position: 'absolute',
    top: '20px',
    bottom: '20px',
    left: '20px',
    right: '20px',
    overflow: 'scroll',
    margin: 0,
    padding: 0,
    border: '2px solid #ccc',
    'font-size': '16px',
    'font-family': 'Arial, sans-serif',
};
export const statusStyle = {
    marginTop: '10px',
    borderTop: '1px solid #ACACAC',
    fontSize: '15px',
    lineHeight: '15px',
    padding: '5px 5px 0',
    color: 'green',
};
export const errorStatusStyle = {
    fontSize: '10px',
    lineHeight: '10px',
    padding: '5px 5px 0',
    color: 'red',
};

// Message constants
export const IM            = 'im';
export const IDENT         = 'identify';
export const CONNECT       = 'connect';
export const DISCONNECT    = 'disconnect';
export const CONNECT_ERR   = 'connect_error';
export const RECONNECT_ERR = 'reconnect_error';

// Defaults
export const PORTS = [3001, 3002, 3003, 3004];
export const USERS = ['Anna', 'Billy'];

const createElement = React.createElement;

export function Socket (onChange, onStatus, onMessage) {
    let socket = null;
    let user, port, recipient;

    // User clicked connect button
    function connect(selectedUser, selectedPort, selectedRecipient) {

        user = selectedUser;
        port = selectedPort;
        recipient = selectedRecipient;

        // Connect
        let host = `http://localhost:${port}`;
        socket = io.connect(host);

        // Set listeners
        socket.on(CONNECT, onConnected);
        socket.on(DISCONNECT, onDisconnected);
        socket.on(CONNECT_ERR, onError);
        socket.on(RECONNECT_ERR, onError);

        // Received connect event from socket
        function onConnected() {
            sendIdent(user);
            socket.on(IM, onMessage);
            onChange(true);
        }

        // Received disconnect event from socket
        function onDisconnected() {
            onChange(false);
        }

        // Received error from socket
        function onError(message) {
            onStatus(message, true);
            disconnect();
        }

    }

    // Send an identification message to the server
    function sendIdent() {
        socket.emit(IDENT, user);
    }

    // Send a message over the socket
    function sendIm(message) {
        socket.emit(IM, message);
    }

    // Close the socket
    function disconnect() {
        socket.close();
    }
}

export class UserSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: USERS[0]}
    }

    render() {
        return createElement('select', {
                name: 'selectUser',
                onChange: this.onChange
            },
            USERS.map( user => createElement('option', {
                value: user
            }))
        );
    }
}

export class PortSelector extends React.Component {
    constructor(props) { // onChange
        super(props);
        this.state = {selected: PORTS[0]}
    }

    render() {
        return createElement('select', {
                name: 'selectPort',
                onChange: this.onChange
            },
            PORTS.map( port => createElement('option', {
                value: port
            }))
        );
    }
}

export class InstantMessage extends React.Component {
    constructor(props) { // user, message
        super(props);
    }

    render() {
        return React.CreateElement( 'span', {
            style: (this.message.from === this.user) ? senderStyle : recipientStyle
        }, `${this.message.from}: ${this.message.text}`)
    }
}

export class MessageHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
        this.addMessage = this.addMessage.bind(this);
    }

    addMessage(message) {
        this.setState(this.state.list.concat([message]));
    }

    render() {
        return createElement('ul', {
            style: Object.assign({}, historyStyle )
        }, this.list.map( (message, index) => createElement('li', {key: index}, message)));
    }
}

// Let user toggle the connection
export class ConnectButton extends React.Component {
    constructor(props) { // connected, handleClick
        super(props);
    }
    render() {
        return createElement('button', {
            style: buttonStyle,
            onClick: this.props.handleClick
        }, this.props.connected ? 'Disconnect' : 'Connect')
    }
}

// Display the connection status
export class StatusLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement('div',
            {style: this.props.isError ? errorStatusStyle : statusStyle},
            this.props.status);
    }
}

// Main client component
export class Client extends React.Component {
    constructor(props) {
        super(props);
        this.socket = new Socket( this.onConnectionChange, this.onStatusChange, this.onIncomingMessage );
        this.state = {
            connected: false,
            status: 'Select a user and port, then click Connect.',
            isError: false,
            messages: [],
            user: null,
            recipient: null,
            port: null
        };
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onConnectionChange = this.onConnectionChange.bind(this);
        this.onToggleConnection = this.onToggleConnection.bind(this);
        this.onIncomingMessage = this.onIncomingMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    // The status message has changed
    onStatusChange(status, isError) {
        this.setState({
            status: status,
            isError: isError
        });
    }

    // The socket's connection state changed
    onConnectionChange(isConnected) {
        this.setState({
                status: isConnected ? 'Connected' : 'Disconnected',
                connected: isConnected,
                isError: false
            }
        );
    }

    // The client has received a message
    onIncomingMessage(message){
        message.key = this.state.messages.length;
        this.setState({
            messages: this.state.messages.concat([message])
        });
    }

    // User clicked the connect/disconnect button
    onToggleConnection() {
        if (this.state.connected) {
            this.socket.disconnect();
        } else if( this.state.port && this.state.user ) {
            this.socket.connect(this.state.user, this.state.port);
        }
    }

    // User wants to send an instant message
    onSendMessage(message) {
        this.socket.sendIM({
            'from': this.state.user,
            'to': this.state.recipient,
            'text': message,
            'forwarded': false
        });
    }

    // Render the component
    render() {
        return createElement('div', {style: clientStyle},

            // Connect button
            createElement(ConnectButton, {
                connected: this.state.connected,
                handleClick: this.onToggleConnection
            }),

            // Status Line
            createElement(StatusLine, {
                status: this.state.status,
                isError: this.state.isError
            })
        )
    }
}