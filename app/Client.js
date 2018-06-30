// Styles
export const clientStyle = {
    display: 'inline-block',
    borderRadius: '2px',
    textAlign: 'right',
    backgroundColor: '#0f0035',
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
    fontSize: '10px',
    lineHeight: '10px',
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

export function Socket (onChange, onStatus, onMessage) {
    let recipient = null;
    let socket = null;
    let user = null;
    let port = null;

    function setUser(selected) {
        user = selected;
        recipient = USERS.find(u => u !== user);
    }

    // Set the port
    function setPort(selected) {
        port = selected;
    }

    function isReady() {
        return port && user;
    }

    // User clicked connect button
    function connect() {

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
            socket.close();
        }

    }

    // Send an identification message to the server
    function sendIdent() {
        socket.emit(IDENT, user);
    }

    // Send a message over the socket
    function sendIm(message) {
        socket.emit(IM, {
            'from': user,
            'to': recipient,
            'text': message,
            'forwarded': false
        });
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
        return React.createElement('select', {
                name: 'selectUser',
                onChange: this.onChange
            },
            USERS.map( user => React.createElement('option', {
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
        return React.createElement('select', {
                name: 'selectPort',
                onChange: this.onChange
            },
            PORTS.map( port => React.createElement('option', {
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
        return React.createElement('ul', {
            style: Object.assign({}, historyStyle )
        }, this.list.map( (message, index) => React.createElement('li', {key: index}, message)));
    }
}

export class ConnectButton extends React.Component {
    constructor(props) { // connected, handleClick
        super(props);
    }
    render() {
        return React.createElement('button', {
            style: buttonStyle,
            onClick: this.handleClick
        }, this.connected ? 'Disconnect' : 'Connect')
    }
}

// WORKING!
export class StatusLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement('div',
            {style: this.props.isError ? errorStatusStyle : statusStyle},
            this.props.status);
    }
}

export class Client extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            connected: false
        }
    }

    render() {
        return React.createElement(StatusLine,
            {status: 'Select a user and port, then click Connect.',
             isError: false});
    }
}


export function TimerDisplay({ title, margin='5px', time, active, onStart, onStop, onReset }) {
    return React.createElement('div', { style: Object.assign({margin}, containerStyle) },
        title && React.createElement('div', { style: titleStyle }, title),
        React.createElement('div', { style: timeStyle }, time ? time.toFixed(3) : ""),
        React.createElement('button', {
            style: (onStart || onStop) ? buttonStyle : disabledButtonStyle,
            onClick: active ? onStop : onStart,
        }, active ? 'STOP' : 'START'),
        React.createElement('button', {
            style: (time === 0 || !onReset) ? disabledButtonStyle : buttonStyle,
            onClick: onReset,
        }, 'RESET')
    )
}

export class TimerContainer extends React.Component {
    constructor(props) {
        super(props)
        this.timer = new Timer(() => this.setState({
            time: this.timer.time
        }))
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return React.createElement(TimerDisplay, {
            title: this.props.title,
            margin: this.props.margin,
            time: this.timer.time,
            active: this.timer.active,
            onStart: this.start,
            onStop: this.stop,
            onReset: this.reset,
        })
    }

    start() {
        this.timer.start()
        this.setState({ active: true, time: this.timer.time })
    }
    stop() {
        this.timer.stop()
        this.setState({ active: false })
    }
    reset() {
        this.timer.reset()
        this.setState({ time: 0 })
    }
}