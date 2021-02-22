import { CLEAR_ORDER, GET_ORDER, ORDER_ERROR, LOGOUT } from '../actions/types';

const initialState = {
  order: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        error: {},
        loading: false,
      };

    case ORDER_ERROR:
      return {
        ...state,
        order: null,
        error: payload,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        order: null,
        error: {},
        loading: false,
      };

    default:
      return state;
  }
}
