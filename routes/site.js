const router = require('express').Router();
let Site = require('../models/site.model');

const router = require('express').Router();
let Other = require('../models/other.model');

//ROUTE GET
router.route('/').get((req, res) => {
  Site.find()
    .then((site) => res.json(site))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//ROUTE POST
router.route('/add').post((req, res) => {
  const sitename = req.body.sitename;

  const newSite = new Site({ sitename });

  newSite
    .save()
    .then(() => res.json('Site added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//ROUTE DELETE
router.route('/:id').delete((req, res) => {
  Site.findByIdAndDelete(req.params.id)
    .then(() => res.json('Site deleted'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//ROUTE PUT
router.route('/:id').put((req, res) => {
  Site.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Site updated'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
