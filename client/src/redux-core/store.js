import {applyMiddleware, createStore} from 'redux';

import socketAuth from 'redux-socket-auth-middleware';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

const middleware = applyMiddleware(socketAuth, logger);

const store = createStore(rootReducer, middleware);

export default store;