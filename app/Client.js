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

export class Socket extends React.Component {

    constructor(port, user, onChange, onStatus, onMessage) {
        this.user = user;
        this.recipient = USERS.find(u => u !== this.user);
        this.port = port;
        this.onChange = onChange; // (isConnected)
        this.onStatus = onStatus; // (status, isError=false)
        this.onMessage = onMessage; // (message)
        this.connect = this.connect.bind(this);
        this.sendIdent = this.sendIdent.bind(this);
        this.sendIm = this.sendIm.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    // User clicked connect button
    connect() {

        // Received connect event from socket
        let onConnected = () => {
            this.sendIdent(this.user);
            this.socket.on(IM, this.onMessage);
            this.onChange(true);
        };

        // Received disconnect event from socket
        let onDisconnected = () => {
            this.onChange(true);
        };

        // Received error from socket
        let onError = message => {
            this.onStatus(message, true);
            this.socket.close();
        };

        // Connect
        let host = `http://localhost:${this.port}`;
        this.socket = io.connect(host);

        // Set listeners
        this.socket.on(CONNECT, onConnected);
        this.socket.on(DISCONNECT, onDisconnected);
        this.socket.on(CONNECT_ERR, onError);
        this.socket.on(RECONNECT_ERR, onError);

    }

    // Send an identification message to the server
    sendIdent() {
        this.socket.emit(IDENT, this.user);
    }

    // Send a message over the socket
    sendIm(message) {
        this.socket.emit(IM, {
            'from': this.user,
            'to': this.recipient,
            'text': message,
            'forwarded': false
        });
    }

    // Close the socket
    disconnect() {
        this.socket.close();
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

export class StatusLine extends React.Component {
    constructor() {
        this.state = {
            status: 'Select a user and port then click Connect',
            isError: false
        };
        this.setStatus = this.setStatus.bind(this);
    }

    setStatus(status, isError=false) {
        this.setState({status: status, isError: isError})
    }

    render() {
        return React.createElement('div', {
            style: this.state.isError ? errorStatusStyle : statusStyle},
            this.state.status);
    }
}

export class Client extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            connected: false,
            user: null,
            port: null
        }
    }

    render() {

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