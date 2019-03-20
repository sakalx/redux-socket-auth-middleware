import {chat} from '../types';

const {
  ADD_MESSAGE,
} = chat;

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});