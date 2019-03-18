import {socket} from '../types';

import socketConnect from '../../api/socket';

const {
  CONNECTING,
} = socket;

export const connectingToServer = (user = null) => ({
  type: CONNECTING,
  payload: socketConnect(user),
});