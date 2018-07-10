// Socket related actions

export const STATUS_CHANGED     = 'socket/status-changed';
export const CONNECTION_CHANGED = 'socket/connection-changed';
export const PORT_CHANGED       = 'socket/port-changed';

// The status message has changed
export const statusChanged = (status, isError) => {
    return {
        type: STATUS_CHANGED,
        status: status,
        isError: isError
    };
};

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