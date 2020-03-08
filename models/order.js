const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String 
  },
  address: {
    type: String
  },
  landMark: {
    type: String 
  },
  orderNumber: {
    type: String 
  },
  items: {
    type: Array
  },
  subTotal: {
    type: Number
  },
  referrals: {
    type: Number
  },
  discount: {
    type : Number
  },
  totalAmount: {
    type: Number
  }
});
const Order = module.exports = mongoose.model('order', OrderSchema);
