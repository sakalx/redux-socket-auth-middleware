import {applyMiddleware, createStore} from 'redux';

import socketAuth from 'redux-socket-auth-middleware';
import {createLogger} from 'redux-logger';

const logger = createLogger({
  collapsed: true,
});

import rootReducer from './reducers';

const middleware = applyMiddleware(socketAuth, logger);

const store = createStore(rootReducer, middleware);

export default store;