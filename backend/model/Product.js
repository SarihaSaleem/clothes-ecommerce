const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  size: [String],
  color: [String],
  price: Number,
  description: String,
  images: [String]
});
module.exports = mongoose.model('Product', productSchema);
