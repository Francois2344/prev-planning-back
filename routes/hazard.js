const router = require('express').Router();
const Hazard = require('../models/hazard.model');

// ROUTE GET
router.route('/').get((req, res) => {
  Hazard.find()
    .then((hazard) => res.json(hazard))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE POST
router.route('/add').post((req, res) => {
  const { hazardName } = req.body;

  const newHazard = new Hazard({ hazardName });

  newHazard
    .save()
    .then(() => res.json('Hazard added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE DELETE
router.route('/:id').delete((req, res) => {
  Hazard.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hazard deleted'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE PUT
router.route('/:id').put((req, res) => {
  Hazard.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Hazard updated'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
