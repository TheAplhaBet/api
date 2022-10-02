const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const product = require('../../models/product');

const productSchema = require('../../models/product');

router.get('/', async (req, res, next) => {
  await productSchema.find()
    .exec()
    .then((docs) => {
      if (docs)
        res.status(200).json(docs);
      else
        res.status(404).json({ message: 'No items found.' })
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err
      })
    })
});

router.post('/', (req, res, next) => {
  new productSchema({
    _id: uuid.v4(),
    name: req.body.name,
    price: req.body.price
  }).save().then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Succsessfully Created A Product',
      result
    });
  }).catch((err) => {
    console.error(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:productId', async (req, res, next) => {
  const id = req.params.productId;
  await product.findById(id)
    .exec()
    .then((doc) => {
      if (doc)
        res.status(200).json(doc);
      else
        res.status(404).json({ message: 'Item not found' });
    })
    .catch((err) => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch('/:productId', async (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  };
  await productSchema.updateMany({ _id: id }, { $set: updateOps })
    .exec()
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).json({
        message: 'No items found'
      });
    });
});

router.delete('/:productId', async (req, res, next) => {
  const id = req.params.productId;
  await productSchema.remove({ _id: id })
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;