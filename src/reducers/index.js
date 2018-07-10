import { combineReducers } from 'redux';
import socketReducer from './socket';
import messageReducer from './message';

export const rootReducer = combineReducers({
    socketState: socketReducer,
    messageState: messageReducer
});

export default rootReducer;