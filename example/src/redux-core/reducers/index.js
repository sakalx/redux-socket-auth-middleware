import {combineReducers} from 'redux';

import snackbar from './snackbar';
import socket from './socket';

const rootReducer = combineReducers({
  snackbar,
  socket,
});

export default rootReducer;