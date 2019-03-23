import {chat} from '../types';

const {
  ADD_MESSAGE,
  SET_MESSAGES,
} = chat;

export const setMessages = (messages = []) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const addMessage = (message = {}) => ({
  type: ADD_MESSAGE,
  payload: message,
});