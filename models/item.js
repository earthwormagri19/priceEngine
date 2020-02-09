const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

// const nameValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [0, 40],
//     message: 'Name must not exceed {ARGS[1]} characters.'
//   })
// ];

// const emailValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [0, 40],
//     message: 'Email must not exceed {ARGS[1]} characters.'
//   }),
//   validate({
//     validator: 'isEmail',
//     message: 'Email must be valid.'
//   })
// ];
// Define the database model
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    unique: true,
  },
  unit: {
    type: String,  
    required: [true, 'unit is required.']
  },
  marketRate: {
    type: String,
    required: [true, 'marketRate is required.']
  },
  zfRate: {
    type: String,  
    required: [true, 'zfRate is required.']
  },
  available: {
    type: String,
    required: [true, 'available is required.']
  }
});

// Use the unique validator plugin
ItemSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Item = module.exports = mongoose.model('item', ItemSchema);