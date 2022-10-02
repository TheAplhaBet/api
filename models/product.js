const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number
});

module.exports = mongoose.model('product', productSchema);