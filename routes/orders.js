const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');

const Order = require('../models/order');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// READ (ONE)
router.get('/:id', (req, res) => {
  Order.findById(req.params.id)
    .then((result) => {
      let items = result.items;
      let subTotal = 0;
      let referralDiscount = 0;
      let promotionalDiscount = 0;
      items.forEach(function(item, i){
          if(item.rate) {
              subTotal = subTotal + Number(item.rate);
          }
          else {
              delete items[i];
          }
      });  
      if(result.referrals && result.referrals >0) {
        referralDiscount = Number(result.referrals) * 10;
      }
      if(result.discount) {
          promotionalDiscount = (subTotal * result.discount) /100;
      }
      result.items = items;
      result.subTotal = subTotal;
      result.referralDiscount = referralDiscount;
      result.discount = promotionalDiscount;
      result.totalAmount = subTotal - (referralDiscount + promotionalDiscount);
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such item.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  Order.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  var payload = req.body;

  (async function(){
      await Order.insertMany(payload).then((result)=> {
        res.json(result);
      });
    })();
});
module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}