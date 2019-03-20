import {user} from '../types';

const {
  GET_USERS,
  SET_USER,
} = user;

export const addMessage = (message) => ({
  type: GET_USERS,
  payload: message,
});

export const setUser = (user = '') => ({
  type: SET_USER,
  payload: user,
});

