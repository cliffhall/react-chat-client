import Socket from "./Socket";
import {statusChanged} from "../../status/actions";
import * as UI from "../../../constants/UI";
import {
    connectionChanged,
    CONNECT_SOCKET,
    DISCONNECT_SOCKET
} from "../actions";
import {
    clientUpdateReceived,
    messageReceived,
    recipientChanged,
    messageSent,
    SEND_MESSAGE
} from "../../message/actions";

const socketMiddleware = store => {

    // The socket's connection state changed
    const onConnectionChange = isConnected => {
        store.dispatch(connectionChanged(isConnected));
        store.dispatch(statusChanged(isConnected ? 'Connected' : 'Disconnected'));
    };

    // There has been a socket error
    const onSocketError = (status) => store.dispatch(statusChanged(status, true));

    // The client has received a message
    const onIncomingMessage = message => store.dispatch(messageReceived(message));

    // The server has updated us with a list of all users currently on the system
    const onUpdateClient = message => {

        const messageState = store.getState().messageState;

        // Remove this user from the list
        const otherUsers = message.list.filter(user => user !== messageState.user);

        // Has our recipient disconnected?
        const recipientLost = messageState.recipient !== UI.NO_RECIPIENT && !(message.list.find(user => user === messageState.recipient));

        // Has our previously disconnected recipient reconnected?
        const recipientFound = !!messageState.lostRecipient && !!message.list.find(user => user === messageState.lostRecipient);

        const dispatchUpdate = () => {
            store.dispatch(clientUpdateReceived(otherUsers, recipientLost));
        };

        if (recipientLost && !messageState.recipientLost) { // recipient just now disconnected
            store.dispatch(statusChanged(`${messageState.recipient} ${UI.RECIPIENT_LOST}`, true));
            dispatchUpdate();
        } else if (recipientFound) { // previously lost recipient just reconnected
            store.dispatch(statusChanged(`${messageState.lostRecipient} ${UI.RECIPIENT_FOUND}`));
            dispatchUpdate();
            store.dispatch(recipientChanged(messageState.lostRecipient));
        } else {
            dispatchUpdate();
        }
    };

    const socket = new Socket(
        onConnectionChange,
        onSocketError,
        onIncomingMessage,
        onUpdateClient
    );

    // Return the handler that will be called for each action dispatched
    return next => action => {

        const messageState = store.getState().messageState;
        const socketState = store.getState().socketState;

        switch (action.type){

            case CONNECT_SOCKET:
                socket.connect(messageState.user, socketState.port);
                break;

            case DISCONNECT_SOCKET:
                socket.disconnect();
                break;

            case SEND_MESSAGE:
                socket.sendIm({
                    'from': messageState.user,
                    'to': messageState.recipient,
                    'text': action.message,
                    'forwarded': false
                });
                store.dispatch(messageSent());
                break;

            default:
                break;
        }

        return next(action)
    };
};

export default socketMiddleware;