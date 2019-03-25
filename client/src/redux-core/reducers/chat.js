import {chat} from '../types';

const {
  ADD_MESSAGE,
  SET_MESSAGES,
} = chat;

const initState = {
  messages: [],
};

export default function(state = initState, {type, payload}) {
  switch (type) {
    case SET_MESSAGES:
      return ({
        ...state,
        messages: payload,
      });

    case ADD_MESSAGE:
      return ({
        ...state,
        messages: [...state.messages, payload],
      });
  }

  return state;
}