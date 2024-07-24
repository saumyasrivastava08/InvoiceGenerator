const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rate: Number,
  gst: Number
});

module.exports = mongoose.model('Product', ProductSchema);
