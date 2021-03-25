const router = require('express').Router();
let Agency = require('../models/agency.model');

//ROUTE GET

router.route('/').get((req, res) => {
    Agency.find()
    .then((agency) => res.json(agency))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;