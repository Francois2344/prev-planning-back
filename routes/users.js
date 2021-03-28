const router = require('express').Router();
const User = require('../models/preventer.model');

// ROUTE GET
router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(() => res.json())
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE POST
router.route('/add').post((req, res) => {
  const { firstname } = req.body;
  const { lastname } = req.body;

  const newUser = new User({ firstname, lastname });

  newUser
    .save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// ROUTE DELETE
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
