import {
  GET_CUSTOMER,
  CUSTOMER_ERROR,
  CLEAR_CUSTOMER,
  LOGOUT,
} from '../actions/types';

const initialState = {
  customer: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER:
      return {
        ...state,
        customer: payload,
        loading: false,
      };

    case CUSTOMER_ERROR:
      return {
        ...state,
        error: payload,
        customer: null,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        order: null,
        error: {},
        loading: false,
      };

    case CLEAR_CUSTOMER:
      return state.filter((customer) => customer.id !== payload);

    default:
      return state;
  }
}
