const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');

const getOrder = async (orderId) => {
  try {
    return await axios.get(
      `https://services.odata.org/V2/Northwind/Northwind.svc/Orders(${orderId})?$format=json`
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
    const orderId = req.query.orderId;
    const order = await getOrder(orderId);

    res.json(order.data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
