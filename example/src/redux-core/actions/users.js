import {user} from '../types';

const {
  SET_USER,
  SET_USERS,
  SET_USERS_STATUS,
} = user;

export const setUser = (user = '') => ({
  type: SET_USER,
  payload: user,
});

export const setUsers = (users = {}) => ({
  type: SET_USERS,
  payload: users,
});

export const setUserStatus = (userStatus = {}) => ({
  type: SET_USERS_STATUS,
  payload: userStatus,
});

