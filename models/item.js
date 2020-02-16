const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

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
