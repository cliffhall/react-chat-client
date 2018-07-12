import { combineReducers } from 'redux';
import { createStore } from 'redux';

// REDUCERS
import socketReducer from './socket/reducer';
import messageReducer from './message/reducer';
import statusReducer from './status/reducer';

// Root reducer
const rootReducer = combineReducers({
    socketState: socketReducer,
    messageState: messageReducer,
    statusState: statusReducer
});

// Store
const store = createStore(rootReducer);

export default store;
