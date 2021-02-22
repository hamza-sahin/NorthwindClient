import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCustomer } from '../../actions/customer';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

var alertIsSet = false;
const Customer = ({ setAlert, getCustomer, auth, customer }) => {
  const [formData, setFormData] = useState({
    customerId: '',
  });

  const { customerId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    getCustomer(customerId);
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(customer.error) && !alertIsSet) {
    setAlert('Custumer with this id does not exist.', 'danger');
    alertIsSet = true;
  }

  if (customer.customer === null) {
    alertIsSet = true;
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Search customer by ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Customer Number'
                name='customerId'
                value={customerId}
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
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Get Customer by Customer ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Customer Number'
                name='customerId'
                value={customerId}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Search' />
          </form>
        </section>
        <section className='container'>
          <li>CustomerID : {customer.customer.CustomerID}</li>
          <li>CompanyName : {customer.customer.CompanyName}</li>
          <li>ContactName : {customer.customer.ContactName}</li>
          <li>ContactTitle : {customer.customer.ContactTitle}</li>
          <li>Address : {customer.customer.Address}</li>
          <li>City : {customer.customer.City}</li>
          <li>PostalCode : {customer.customer.PostalCode}</li>
          <li>Country : {customer.customer.Country}</li>
          <li>Phone : {customer.customer.Phone}</li>
          <li>Fax : {customer.customer.Fax}</li>
        </section>
      </Fragment>
    );
  }
};

Customer.propTypes = {
  getCustomer: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  customer: state.customer,
});

export default connect(mapStateToProps, { setAlert, getCustomer })(Customer);
