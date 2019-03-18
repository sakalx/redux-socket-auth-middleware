import {socket, socketAuth} from '../types';

const {
  PENDING,
  CONNECTED,
  REJECTED,
  DISCONNECTED,
} = socketAuth;

const {
  CONNECTING,
} = socket;

const initState = {
  disconnectReason: null,
  error: null,
  fetching: false,
  io: null,
};

export default function(state = initState, {type, payload}) {
  switch (type) {

    case CONNECTING + PENDING:
      return ({
        ...state,
        disconnectReason: null,
        error: null,
        fetching: true,
      });

    case CONNECTING + CONNECTED:
      return ({
        ...state,
        io: payload,
        fetching: false,
      });

    case CONNECTING + REJECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });

    case CONNECTING + DISCONNECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });
  }

  return state;
}