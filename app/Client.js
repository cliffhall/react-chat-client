/**
 * React-based chat client for node-multi-server-chat
 */
const createElement = React.createElement;

// Styles
const clientStyle = {
    width: '400px',
    display: 'block',
    border: '1px solid #ACACAC',
    borderRadius: '5px',
    textAlign: 'left',
    backgroundColor: '#FCFCFC',
    color: '#00000',
    fontFamily: "'Lato', 'PT Sans', Helvetica, sans-serif"
};
const footerStyle = {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #ACACAC'
};
const buttonStyle = {
    backgroundColor: '#ffffff',
    margin: '3px',
    borderRadius: '5px',
    border: '2px solid #9667ff',
    fontSize: '10px',
    color: '#9667ff',
    padding: '5px',
    cursor: 'pointer'
};
const disabledButtonStyle = Object.assign({}, buttonStyle, {
    color: '#C3C3C3',
    border: '2px solid #C3C3C3',
    cursor: 'not-allowed'
});
const recipientStyle = {
    fontSize: '12px',
    lineHeight: '12px',
    padding: '5px 5px 0',
    color: 'blue'};
const senderStyle = {
    fontSize: '12px',
    lineHeight: '12px',
    padding: '5px 5px 0',
    color: 'orange'};
const historyStyle = {
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
const statusStyle = {
    fontSize: '17px',
    lineHeight: '15px',
    padding: '10px 5px 0 5px',
    color: 'green',
    flexGrow: '2'
};
const errorStatusStyle = {
    fontSize: '10px',
    lineHeight: '10px',
    padding: '5px 5px 0',
    color: 'red',
};
const fieldStyle = {
    margin: '10px'
};
const labelStyle = {
    marginRight: '10px'
};

// Message constants
const IM            = 'im';
const IDENT         = 'identify';
const CONNECT       = 'connect';
const DISCONNECT    = 'disconnect';
const CONNECT_ERR   = 'connect_error';
const RECONNECT_ERR = 'reconnect_error';
const UPDATE_CLIENT = 'update_client';

// Chat server ports
const PORTS = [3001, 3002, 3003, 3004];

// No Recipient
const NO_RECIPIENT = 'Choose someone to message';

// Socket manager
export class Socket {

    constructor(onChange, onStatus, onMessage, onUpdateClient) {
        this.onChange = onChange;
        this.onStatus = onStatus;
        this.onMessage = onMessage;
        this.onUpdateClient = onUpdateClient;
        this.socket = null;
        this.user = null;
        this.port = null;
        this.connect = this.connect.bind(this);
        this.sendIdent = this.sendIdent.bind(this);
        this.sendIm = this.sendIm.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.onConnected = this.onConnected.bind(this);
        this.onDisconnected = this.onDisconnected.bind(this);
        this.onError = this.onError.bind(this);
    }

    // User clicked connect button
    connect(user, port) {

        this.user = user;
        this.port = port;

        // Connect
        let host = `http://localhost:${port}`;
        this.socket = io.connect(host);

        // Set listeners
        this.socket.on(CONNECT, this.onConnected);
        this.socket.on(DISCONNECT, this.onDisconnected);
        this.socket.on(CONNECT_ERR, this.onError);
        this.socket.on(RECONNECT_ERR, this.onError);
    }

    // Received connect event from socket
    onConnected() {
        this.sendIdent(this.user);
        this.socket.on(IM, this.onMessage);
        this.socket.on(UPDATE_CLIENT, this.onUpdateClient);
        this.onChange(true);
    }

    // Received disconnect event from socket
    onDisconnected() {
        this.onChange(false);
    }

    // Received error from socket
    onError(message) {
        this.onStatus(message, true);
        this.disconnect();
    }

    // Send an identification message to the server
    sendIdent() {
        this.socket.emit(IDENT, this.user);
    }

    // Send a message over the socket
    sendIm(message) {
        this.socket.emit(IM, message);
    }

    // Close the socket
    disconnect() {
        this.socket.close();
    }
}

// Text input for user name
export class UserInput extends React.Component {
    constructor(props) { // connected, onChange
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Pass the value of the input field up to the client
    handleInputChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return createElement('div',{style: fieldStyle},

            // Label
            createElement('label',{
                style: labelStyle,
                htmlFor: 'userInput'
            }, 'Your Name'),

            // Text Input
            createElement('input', {
                name: 'userInput',
                type: 'text',
                onChange: this.handleInputChange,
                disabled: this.props.connected
            })
        );
    }
}

// Dropdown to select port number to connect to
export class PortSelector extends React.Component {
    constructor(props) { // connected, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return createElement('div',{style: fieldStyle},

            // Label
            createElement('label',{
                style: labelStyle,
                htmlFor: 'selectPort'
            }, 'Server Port'),

            // Dropdown
            createElement('select', {
                    name: 'selectPort',
                    onChange: this.handleSelectChange,
                    disabled: this.props.connected
                },
                PORTS.map( (port, index) => createElement('option', {
                    value: port,
                    key: index
                }, port))
            )
        )
    }
}

// Dropdown to select recipient to message
export class RecipientSelector extends React.Component {
    constructor(props) { // users, recipient, onChange
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    // Pass the value of the dropdown up to the client
    handleSelectChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        let retval = null;
        if (this.props.users.length) {
            retval = createElement('div', {style: fieldStyle},

                // Label
                createElement('label', {
                    style: labelStyle,
                    htmlFor: 'selectRecipient'
                }, 'Recipient'),

                // Dropdown
                createElement('select', {
                        name: 'selectRecipient',
                        onChange: this.handleSelectChange
                    },
                    createElement('option',{
                        value: NO_RECIPIENT,
                        key: -1
                    },'Choose someone to message'),
                    this.props.users.map((user, index) => createElement('option', {
                        value: user,
                        defaultValue: this.props.recipient === user,
                        key: index
                    }, user))
                )
            )
        }
        return retval;
    }
}

// Let user toggle the connection
export class ConnectButton extends React.Component {
    constructor(props) { // disabled, connected, handleClick
        super(props);
    }

    render() {
        return createElement('button', {
            style: this.props.enabled ? buttonStyle : disabledButtonStyle,
            onClick: this.props.handleClick,
            disabled: !this.props.enabled
        }, this.props.connected ? 'Disconnect' : 'Connect');
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

// Let user send a message
export class SendButton extends React.Component {
    constructor(props) { // enabled, onSend
        super(props);
    }

    render() {
        return createElement('button', {
            style: this.props.enabled ? buttonStyle : disabledButtonStyle,
            onClick: this.props.onSend,
            disabled: !this.props.enabled
        }, 'Send');
    }
}

// Text input for outgoing message
export class MessageInput extends React.Component {
    constructor(props) { // onChange
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // Pass the value of the input field up to the client
    handleInputChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return createElement('span',{},

            // Label
            createElement('label',{
                style: labelStyle,
                htmlFor: 'messageInput'
            }, 'Message'),

            // Text Input
            createElement('input', {
                name: 'messageInput',
                type: 'text',
                onChange: this.handleInputChange
            })
        );
    }
}

// Message input and send button
export class MessageTransport extends React.Component {
    constructor(props) { // connected, recipient, outgoingMessage, onChange, onSend
        super(props);
    }

    render() {
        let retval = null;
        if( this.props.connected && this.props.recipient !== NO_RECIPIENT) {
            retval = createElement('div',{style: fieldStyle},

                // Outgoing message input and send button
                createElement(MessageInput, { // enabled, onChange
                    onChange: this.props.onChange
                }),

                // Send button
                createElement(SendButton, {
                    enabled: this.props.outgoingMessage,
                    onSend: this.props.onSend
                })

            );
        }

        return retval;
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

// Main client component
export class Client extends React.Component {
    constructor(props) {
        super(props);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onConnectionChange = this.onConnectionChange.bind(this);
        this.onToggleConnection = this.onToggleConnection.bind(this);
        this.onIncomingMessage = this.onIncomingMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onUserChange = this.onUserChange.bind(this);
        this.onPortChange = this.onPortChange.bind(this);
        this.onUpdateClient = this.onUpdateClient.bind(this);
        this.onRecipientChange = this.onRecipientChange.bind(this);
        this.onMessageInputChange = this.onMessageInputChange.bind(this);
        this.socket = new Socket(
            this.onConnectionChange,
            this.onStatusChange,
            this.onIncomingMessage,
            this.onUpdateClient
        );
        this.state = {
            connected: false,
            status: 'Select a user and port.',
            isError: false,
            user: null,
            recipient: NO_RECIPIENT,
            outgoingMessage: null,
            messages: [],
            port: PORTS[0],
            users: []
        };
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
        });
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
            this.setState({
                users:[],
                recipient: NO_RECIPIENT,
                outgoingMessage: null
            });
        } else if( this.state.port && this.state.user ) {
            this.socket.connect(this.state.user, this.state.port);
        }
    }

    // User wants to send an instant message
    onSendMessage() {
        this.socket.sendIm({
            'from': this.state.user,
            'to': this.state.recipient,
            'text': this.state.outgoingMessage,
            'forwarded': false
        });
    }

    // A user has been selected
    onUserChange(user) {
        this.setState({user: user});
    }

    // A port has been selected
    onPortChange(port) {
        this.setState({port: port});
    }

    // The server has updated us with a list of users
    onUpdateClient(message){
        let otherUsers = message.list.filter(user => user !== this.state.user);
        this.setState({users: otherUsers});
    }

    // A recipient has been selected
    onRecipientChange(user) {
        this.setState({recipient: user});
        if (user === NO_RECIPIENT) this.setState({outgoingMessage: null});
    }

    // The outgoing message text has changed
    onMessageInputChange(text) {
        this.setState({outgoingMessage: text})
    }

    // Render the component
    render() {
        return createElement('div', {style: clientStyle},

            // User selector
            createElement(UserInput, {
                connected: this.state.connected,
                onChange: this.onUserChange
            }),

            // Port selector
            createElement(PortSelector, {
                connected: this.state.connected,
                onChange: this.onPortChange
            }),

            // Recipient selector
            createElement(RecipientSelector, {
                users: this.state.users,
                recipient: this.state.recipient,
                onChange: this.onRecipientChange
            }),

            // Outgoing message input and send button
            createElement(MessageTransport, {
                connected: this.state.connected,
                recipient: this.state.recipient,
                outgoingMessage: this.state.outgoingMessage,
                onChange: this.onMessageInputChange,
                onSend: this.onSendMessage
            }),

            // Footer (status line / connection toggle)
            createElement('div', {style: footerStyle},

                // Status Line
                createElement(StatusLine, {
                    status: this.state.status,
                    isError: this.state.isError
                }),

                // Connect button
                createElement(ConnectButton, {
                    enabled: (this.state.port && this.state.user),
                    connected: this.state.connected,
                    handleClick: this.onToggleConnection
                })
            )
        )
    }
}