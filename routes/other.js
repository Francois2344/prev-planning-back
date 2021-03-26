const router = require('express').Router();
const Other = require('../models/other.model');

// ROUTE GET
router.route('/').get((req, res) => {
  Other.find()
    .then((other) => res.json(other))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE POST
router.route('/add').post((req, res) => {
  const { othername } = req.body;

  const newOther = new Other({ othername });

  newOther
    .save()
    .then(() => res.json('Agency added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE DELETE
router.route('/:id').delete((req, res) => {
  Other.findByIdAndDelete(req.params.id)
    .then(() => res.json('Other deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE PUT
router.route('/:id').put((req, res) => {
  Other.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Other updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
