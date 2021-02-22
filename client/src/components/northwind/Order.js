import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOrder } from '../../actions/order';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

var alertIsSet = false;

const Order = ({ setAlert, getOrder, auth, order }) => {
  const [formData, setFormData] = useState({
    orderId: '',
  });

  const { orderId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    getOrder(orderId);
  };

  function getDateString(str) {
    var thenum = parseInt(str.match(/\d/g).join(''), 10);
    var date = new Date(thenum);
    date = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    return date;
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(order.error) && !alertIsSet) {
    setAlert('Order with this number does not exist.', 'danger');
    alertIsSet = true;
  }

  if (order.order === null) {
    alertIsSet = true;
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Get Order by Order ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Order Number'
                name='orderId'
                value={orderId}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Search' />
          </form>
        </section>
      </Fragment>
    );
  } else {
    alertIsSet = false;
    const orderDate = getDateString(order.order.OrderDate);
    const requiredDate = getDateString(order.order.RequiredDate);
    const shippedDate = getDateString(order.order.ShippedDate);
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Search order by Order ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Order Number'
                name='orderId'
                value={orderId}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Search' />
          </form>
        </section>
        <section className='container'>
          <li>Order ID: {order.order.OrderID}</li>
          <li>Customer ID : {order.order.CustomerID}</li>
          <li>Employee ID : {order.order.EmployeeID}</li>
          <li>Order Date : {orderDate}</li>
          <li>Required Date : {requiredDate}</li>
          <li>Shipped Date : {shippedDate}</li>
          <li>Ship Via : {order.order.ShipVia}</li>
          <li>Freight : {order.order.Freight}</li>
          <li>Ship Name : {order.order.ShipName}</li>
          <li>Ship Address : {order.order.ShipAddress}</li>
          <li>Ship City : {order.order.ShipCity}</li>
          <li>Ship PostalCode : {order.order.ShipPostalCode}</li>
          <li>Ship Country : {order.order.ShipCountry}</li>
        </section>
      </Fragment>
    );
  }
};

Order.propTypes = {
  getOrder: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
});

export default connect(mapStateToProps, { setAlert, getOrder })(Order);
