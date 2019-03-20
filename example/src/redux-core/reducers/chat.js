import {chat} from '../types';

const {
  ADD_MESSAGE,
} = chat;

const initState = {
  messages: [],
};

export default function(state = initState, {type, payload}) {
  switch (type) {
    case ADD_MESSAGE:
      return ({
        ...state,
        messages: [...state.messages, payload],
      });
  }

  return state;
}