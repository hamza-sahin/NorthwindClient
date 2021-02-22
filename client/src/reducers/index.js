import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import order from './order';
import customer from './customer';
import product from './product';

export default combineReducers({
  alert,
  auth,
  profile,
  order,
  customer,
  product,
});
