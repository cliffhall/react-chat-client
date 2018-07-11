import { combineReducers } from 'redux';
import socketReducer from './socket';
import messageReducer from './message';
import statusReducer from './status';

const rootReducer = combineReducers({
    socketState: socketReducer,
    messageState: messageReducer,
    statusState: statusReducer
});

export default rootReducer;