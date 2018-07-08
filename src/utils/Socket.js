import * as Protocol from '../constants/Protocol.js';
import io from 'socket.io-client';
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
        this.socket.on(Protocol.CONNECT, this.onConnected);
        this.socket.on(Protocol.DISCONNECT, this.onDisconnected);
        this.socket.on(Protocol.CONNECT_ERR, this.onError);
        this.socket.on(Protocol.RECONNECT_ERR, this.onError);
    }

    // Received connect event from socket
    onConnected() {
        this.sendIdent(this.user);
        this.socket.on(Protocol.IM, this.onMessage);
        this.socket.on(Protocol.UPDATE_CLIENT, this.onUpdateClient);
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
        this.socket.emit(Protocol.IDENT, this.user);
    }

    // Send a message over the socket
    sendIm(message) {
        this.socket.emit(Protocol.IM, message);
    }

    // Close the socket
    disconnect() {
        this.socket.close();
    }
}
