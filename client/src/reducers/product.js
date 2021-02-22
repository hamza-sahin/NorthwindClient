import {
  CLEAR_PRODUCT,
  GET_PRODUCT,
  PRODUCT_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  product: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
      };

    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        product: null,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        order: null,
        error: {},
        loading: false,
      };

    case CLEAR_PRODUCT:
      return state.filter((customer) => customer.id !== payload);

    default:
      return state;
  }
}
