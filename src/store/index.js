import { createStore, combineReducers, applyMiddleware } from 'redux';

// REDUCERS
import socketReducer from './socket/reducer';
import messageReducer from './message/reducer';
import statusReducer from './status/reducer';

// MIDDLEWARE
import socketMiddleware from './socket/middleware';

// Root reducer
const rootReducer = combineReducers({
    socketState: socketReducer,
    messageState: messageReducer,
    statusState: statusReducer
});

// Store
const store = createStore(
    rootReducer,
    applyMiddleware(socketMiddleware));

export default store;
