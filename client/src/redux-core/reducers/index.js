import {combineReducers} from 'redux';

import chat from './chat';
import snackbar from './snackbar';
import socket from './socket';
import users from './users';

const rootReducer = combineReducers({
  chat,
  snackbar,
  socket,
  users,
});

export default rootReducer;