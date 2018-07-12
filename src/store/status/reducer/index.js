// ACTIONS
import { STATUS_CHANGED } from '../actions';

// CONSTANTS
import { UI } from '../../../constants';

// Initial state
const INITIAL_STATE = {
    status: UI.INITIAL_PROMPT,
    isError: false
};

// Status reducer
function statusReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case STATUS_CHANGED:
            reduced = Object.assign({}, state, {
                status: String(action.status),
                isError: action.isError
            });
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default statusReducer;