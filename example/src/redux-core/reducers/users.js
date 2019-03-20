import {user} from '../types';

const {
  GET_USERS,
  SET_USER,
} = user;

const initState = {
  current: {
    id: null,
    name: '',
  },
  users: [],
};

export default function(state = initState, {type, payload}) {
  switch (type) {

    case GET_USERS:
      return ({
        ...state,
        users: [...state.users, payload],
      });

    case SET_USER:
      return ({
        ...state,
        current: payload,
      });
  }

  return state;
}