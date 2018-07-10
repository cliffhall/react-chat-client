import { STATUS_CHANGED, CONNECTION_CHANGED, PORT_CHANGED } from '../../actions/socket';
import { PORTS, INITIAL_PROMPT } from '../../constants/Config.js';

const INITIAL_STATE = {
    connected: false,
    status: INITIAL_PROMPT,
    isError: false,
    port: String(PORTS[0])
};

function socketReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case STATUS_CHANGED:
            reduced = Object.assign({}, state, {
                status: action.status,
                isError: action.isError
            });
            break;

        case CONNECTION_CHANGED:
            reduced = Object.assign({}, state, {
                status: action.connected ? 'Connected' : 'Disconnected',
                connected: action.connected,
                isError: false
            });
            break;

        case PORT_CHANGED:
            reduced = Object.assign({}, state, {
                port: action.port
            });
            break;

        default:
            reduced = state;
    }
    console.log(reduced);
    return reduced;
}

export default socketReducer;