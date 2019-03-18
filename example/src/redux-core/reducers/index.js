import {combineReducers} from 'redux';

import socket from './socket';

const rootReducer = combineReducers({
  socket,
});

export default rootReducer;