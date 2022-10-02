const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders'
  })
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(200).json({
    message: 'Order was created.',
    order: order
  })
});

router.get('/:orderId ', (req, res, next) => {
  res.status(200).json({
    message: 'Orders'
  })
});

router.delete('/:orderId ', (req, res, next) => {
  res.status(200).json({
    message: 'Orders'
  })
});

module.exports = router;