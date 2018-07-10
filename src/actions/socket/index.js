// Socket related actions
export const CONNECTION_CHANGED = 'socket/connection-changed';
export const PORT_CHANGED       = 'socket/port-changed';

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