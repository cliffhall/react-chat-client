import { combineReducers } from 'redux';
import { createStore } from 'redux';
import socketReducer from './socket/reducer';
import messageReducer from './message/reducer';
import statusReducer from './status/reducer';

const rootReducer = combineReducers({
    socketState: socketReducer,
    messageState: messageReducer,
    statusState: statusReducer
});

const store = createStore(rootReducer);

export default store;
