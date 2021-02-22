import axios from 'axios';
import { setAlert } from './alert';

import { GET_CUSTOMER, CLEAR_CUSTOMER, CUSTOMER_ERROR } from './types';

// Get customer

export const getCustomer = (customerId) => async (dispatch) => {
  try {
    const uri = `/api/customers?customerId=${customerId}`;
    const res = await axios.get(uri);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data.d,
    });
  } catch (err) {
    dispatch({
      type: CUSTOMER_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
