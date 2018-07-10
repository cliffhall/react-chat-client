import {
    USER_CHANGED,
    RECIPIENT_CHANGED,
    OUTGOING_MESSAGE_CHANGED,
    MESSAGE_RECEIVED,
    CLIENT_UPDATE_RECEIVED,
    SEND_MESSAGE,
    ABANDON_CHAT
} from '../../actions/message';
import { NO_RECIPIENT } from '../../constants/Config.js';

const INITIAL_STATE = {
    user: undefined,
    recipient: NO_RECIPIENT,
    outgoingMessage: '',
    messages: [],
    users: []
};

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
                (action.recipient === NO_RECIPIENT) ? {outgoingMessage: ''} : {}
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
            let otherUsers = action.message.list.filter(user => user !== state.user);
            reduced = Object.assign({},
                state, {users: otherUsers},
                (otherUsers.length) ? {} : {recipient: NO_RECIPIENT}
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
                {users:[], recipient: NO_RECIPIENT, outgoingMessage: ''}
            );
            break;


        default:
            reduced = state;
    }
    return reduced;
}

export default messageReducer;