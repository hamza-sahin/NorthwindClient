import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { setAlert } from './alert';

import { GET_ORDER, CLEAR_ORDER, ORDER_ERROR } from './types';

// Get order

export const getOrder = (orderId) => async (dispatch) => {
  try {
    const id = uuid();
    const uri = `/api/orders?orderId=${orderId}`;
    const res = await axios.get(uri);
    dispatch({
      type: GET_ORDER,
      payload: res.data.d,
    });
  } catch (err) {
    setAlert('Doesnt', 'danger');

    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
