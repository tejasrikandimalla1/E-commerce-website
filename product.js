const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  cost: {
    type: Number,
    required: true
  },
  image: String,
  category: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
