const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');

const getProduct = async (productId) => {
  try {
    return await axios.get(
      `https://services.odata.org/V2/Northwind/Northwind.svc/Products(${productId})?$format=json`
    );
  } catch (error) {
    console.log(error);
  }
};

// @route     GET api/posts
// @desc      Test route
// @access    Public
router.get('/', auth, async (req, res) => {
  try {
    const productId = req.query.productId;
    const product = await getProduct(productId);

    res.json(product.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
