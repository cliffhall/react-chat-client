// Socket related actions
export const CONNECTION_CHANGED = 'socket/connection-changed';
export const PORT_CHANGED       = 'socket/port-changed';
export const CONNECT_SOCKET            = 'socket/connect';
export const DISCONNECT_SOCKET         = 'socket/disconnect';

// The socket's connection state changed
export const connectionChanged = isConnected => {
    return {
        type: CONNECTION_CHANGED,
        connected: isConnected,
        isError: false
    };
};

// The user selected a different port for the socket
export const portChanged = port => {
    return {
        type: PORT_CHANGED,
        port: port
    };
};

// The user clicked the connect button
export const connectSocket = (user, port) => {
    return {
        type: CONNECT_SOCKET
    };
};

// The user clicked the disconnect button
export const disconnectSocket = () => {
    return {
        type: DISCONNECT_SOCKET
    };
};