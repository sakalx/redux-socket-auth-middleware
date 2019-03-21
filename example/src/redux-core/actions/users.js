import {user} from '../types';

const {
  SET_USER,
  SET_USERS,
} = user;

export const setUser = (user = '') => ({
  type: SET_USER,
  payload: user,
});

export const setUsers = (users = {}) => ({
  type: SET_USERS,
  payload: users,
});

