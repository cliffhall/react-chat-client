// Message constants
const IM            = 'im';
const IDENT         = 'identify';
const CONNECT       = 'connect';
const DISCONNECT    = 'disconnect';
const CONNECT_ERR   = 'connect_error';
const RECONNECT_ERR = 'reconnect_error';
const UPDATE_CLIENT = 'update_client';

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
