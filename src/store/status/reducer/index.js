import { STATUS_CHANGED } from '../actions';
import { INITIAL_PROMPT } from '../../../constants/Config.js';

const INITIAL_STATE = {
    status: INITIAL_PROMPT,
    isError: false
};

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