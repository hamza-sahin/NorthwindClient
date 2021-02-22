import axios from 'axios';
import { setAlert } from './alert';

import { GET_PRODUCT, CLEAR_PRODUCT, PRODUCT_ERROR } from './types';

// Get product

export const getProduct = (productId) => async (dispatch) => {
  try {
    const uri = `/api/products?productId=${productId}`;
    const res = await axios.get(uri);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data.d,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};
