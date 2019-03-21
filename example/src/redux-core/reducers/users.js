import {user} from '../types';

const {
  SET_USER,
  SET_USERS,
  SET_USERS_STATUS,
} = user;

const initState = {
  current: {
    id: null,
    name: '',
  },
  data: {},
};

const getAvatarColor = () => {
  const avatarColors = [
    '#d2a0ef',
    '#65eee1',
    '#9aa1ce',
    '#c5dd62',
    '#7ad9ff',
    '#dec1b4',
    '#ff79a7'];
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
};

export default function(state = initState, {type, payload}) {
  switch (type) {
    case SET_USER:
      return ({
        ...state,
        current: payload,
      });

    case SET_USERS:
      for (const userId in payload) {
        payload[userId].avatarColor = getAvatarColor();
      }

      return ({
        ...state,
        data: payload,
      });

    case SET_USERS_STATUS:
      const {userId, status} = payload;

      return ({
        ...state,
        data: {
          ...state.data,

          [userId]: {
            ...state.data[userId],
            status,
          },
        },
      });
  }

  return state;
}