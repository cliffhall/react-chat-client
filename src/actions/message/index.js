// Message related actions
export const USER_CHANGED             = 'message/user-changed';
export const RECIPIENT_CHANGED        = 'message/recipient-changed';
export const OUTGOING_MESSAGE_CHANGED = 'message/outgoing-message-changed';
export const MESSAGE_RECEIVED         = 'message/message-received';
export const CLIENT_UPDATE_RECEIVED   = 'message/client-update-received';
export const SEND_MESSAGE             = 'message/send-message';
export const ABANDON_CHAT             = 'message/abandon-chat';

// The user has changed
export const userChanged = user => {
    return {
        type: USER_CHANGED,
        user: user
    };
};

// The recipient has changed
export const recipientChanged = recipient => {
    return {
        type: RECIPIENT_CHANGED,
        recipient: recipient
    };
};

// The outgoing message has changed
export const outgoingMessageChanged = text => {
    return {
        type: OUTGOING_MESSAGE_CHANGED,
        text: text
    };
};

// The client has received a message
export const messageReceived = message => {
    return {
        type: MESSAGE_RECEIVED,
        message: message
    };
};

// The server has updated us with a list of users
export const clientUpdateReceived = message => {
    return {
        type: CLIENT_UPDATE_RECEIVED,
        message: message
    };
};

// Send an instant message
export const sendMessage = (socket, message) => {
    return {
        type: SEND_MESSAGE,
        message: message,
        socket: socket
    };
};

export const abandonChat = () => ({ type: ABANDON_CHAT });