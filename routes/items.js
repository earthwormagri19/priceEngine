const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const stringCapitalizeName = require('string-capitalize-name');

const Item = require('../models/item');

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
  Item.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such item.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  Item.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  let newItem= new Item({
    name: sanitizeName(req.body.name),
    unit: sanitizeName(req.body.unit),
    marketRate: sanitizeName(req.body.marketRate),
    zfRate: req.body.zfRate,
    available: sanitizeName(req.body.available),
  });

  newItem.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          name: result.name,
          unit: result.unit,
          marketRate: result.marketRate,
          zfRate: result.zfRate,
          available: result.available
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.unit) {
          res.status(400).json({ success: false, msg: err.errors.unit.message });
          return;
        }
        if (err.errors.marketRate) {
          res.status(400).json({ success: false, msg: err.errors.marketRate.message });
          return;
        }
        if (err.errors.zfRate) {
          res.status(400).json({ success: false, msg: err.errors.zfRate.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', (req, res) => {

  let updatedItem = {
    name: sanitizeName(req.body.name),
    unit: sanitizeName(req.body.unit),
    marketRate: sanitizeName(req.body.marketRate),
    zfRate: sanitizeName(req.body.zfRate),
    available: sanitizeName(req.body.available)
  };

  Item.findOneAndUpdate({ _id: req.params.id }, updatedItem, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Item.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              unit: newResult.unit,
              marketRate: newResult.marketRate,
              zfRate: newResult.zfRate,
              available: newResult.available
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.name) {
          res.status(400).json({ success: false, msg: err.errors.name.message });
          return;
        }
        if (err.errors.unit) {
          res.status(400).json({ success: false, msg: err.errors.unit.message });
          return;
        }
        if (err.errors.marketRate) {
          res.status(400).json({ success: false, msg: err.errors.marketRate.message });
          return;
        }
        if (err.errors.zfRate) {
          res.status(400).json({ success: false, msg: err.errors.zfRate.message });
          return;
        }
        if (err.errors.available) {
          res.status(400).json({ success: false, msg: err.available.zfRate.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  Item.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          unit: result.unit,
          marketRate: result.marketRate,
          zfRate: result.zfRate,
          available: result.available
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}