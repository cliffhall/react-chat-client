// ACTIONS
import {
    USER_CHANGED,
    RECIPIENT_CHANGED,
    OUTGOING_MESSAGE_CHANGED,
    MESSAGE_RECEIVED,
    CLIENT_UPDATE_RECEIVED,
    SEND_MESSAGE,
    ABANDON_CHAT
} from '../actions';

// CONSTANTS
import { UI } from '../../../constants';

// Initial state
const INITIAL_STATE = {
    user: undefined,
    recipient: UI.NO_RECIPIENT,
    outgoingMessage: '',
    recipientLost: false,
    lostRecipient: null,
    messages: [],
    users: []
};

// Message Reducer
function messageReducer(state = INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
       case USER_CHANGED:
            reduced = Object.assign({},
                state, {user: action.user}
            );
            break;

        case RECIPIENT_CHANGED:
            reduced = Object.assign({},
                state,
                {recipient: action.recipient},
                (action.recipient === UI.NO_RECIPIENT) ? {outgoingMessage: ''} : {}
            );
            break;

        case OUTGOING_MESSAGE_CHANGED:
            reduced = Object.assign({},
                state,
                {outgoingMessage: action.text}
            );
            break;

        case MESSAGE_RECEIVED:
            let keyedMessage = Object.assign({}, action.message, {key: state.messages.length});
            reduced = Object.assign({}, state, {
                messages: state.messages.concat([keyedMessage])
            });
            break;

        case CLIENT_UPDATE_RECEIVED:
            reduced = Object.assign({},
                state, {users: action.otherUsers, recipientLost: action.recipientLost},
                (action.recipientLost)
                    ? {recipient: UI.NO_RECIPIENT, lostRecipient: state.recipient}
                    : {},
                (!action.recipientLost && !!state.lostRecipient)
                    ? {recipient: state.lostRecipient}
                    : {}
            );
            break;

        case SEND_MESSAGE:
            action.socket.sendIm({
                'from': state.user,
                'to': state.recipient,
                'text': state.outgoingMessage,
                'forwarded': false
            });
            reduced = Object.assign({},
                state, {outgoingMessage: action.user}
            );
            break;

        case ABANDON_CHAT:
            reduced = Object.assign({},
                state,
                {users:[], recipient: UI.NO_RECIPIENT, outgoingMessage: ''}
            );
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default messageReducer;