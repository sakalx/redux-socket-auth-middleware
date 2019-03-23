import {snackbar} from '../types';

const {
  SHOW_SNACKBAR,
  HIDE_SNACKBAR,
} = snackbar;

const initState = {
  isOpen: false,
  message: '',
};

export default function(state = initState, {type, payload}) {
  switch (type) {

    case SHOW_SNACKBAR:
      return ({
        isOpen: true,
        message: payload,
      });

    case HIDE_SNACKBAR:
      return ({
        ...state,
        isOpen: false,
      });
  }

  return state;
}