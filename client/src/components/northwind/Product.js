import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProduct } from '../../actions/product';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { setAlert } from '../../actions/alert';

var alertIsSet = false;
const Product = ({ setAlert, getProduct, auth, product }) => {
  const [formData, setFormData] = useState({
    productId: '',
  });

  const { productId } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    getProduct(productId);
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (!isEmpty(product.error) && !alertIsSet) {
    setAlert('Product with this number does not exist.', 'danger');
    alertIsSet = true;
  }

  if (product.product === null) {
    alertIsSet = true;
    return (
      <Fragment>
        <section className='container'>
          <h1 className='large text-primary'>Search product by ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Product Number'
                name='productId'
                value={productId}
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
          <h1 className='large text-primary'>Get Product by Product ID</h1>
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Enter Product Number'
                name='productId'
                value={productId}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <input type='submit' className='btn btn-primary' value='Search' />
          </form>
        </section>
        <section className='container'>
          <li>Product ID: {product.product.ProductID}</li>
          <li>Product Name : {product.product.ProductName}</li>
          <li>Supplier ID : {product.product.SupplierID}</li>
          <li>Category ID : {product.product.CategoryID}</li>
          <li>Quantity Per Unit : {product.product.QuantityPerUnit}</li>
          <li>Unit Price : {product.product.UnitPrice}</li>
          <li>Units In Stock : {product.product.UnitsInStock}</li>
          <li>Units On Order : {product.product.UnitsOnOrder}</li>
          <li>Reorder Level : {product.product.ReorderLevel}</li>
        </section>
      </Fragment>
    );
  }
};

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { setAlert, getProduct })(Product);
