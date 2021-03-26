const router = require('express').Router();
let Agency = require('../models/agency.model');

//ROUTE GET
router.route('/').get((req, res) => {
    Agency.find()
    .then((agency) => res.json(agency))
    .catch((err) => res.status(400).json("Error: " + err));
});

//ROUTE POST
router.route('/add').post((req, res) => {
    const agencyname = req.body.agencyname

    const newAgency = new Agency({agencyname});

    newAgency.save()
    .then(() => res.json("Agency added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//ROUTE DELETE
router.route('/:id').delete((req, res) => {
    Agency.findByIdAndDelete(req.params.id)
    .then(() => res.json("Agency deleted"))
    .catch((err) => res.status(400).json('Error: ' + err));
});

//ROUTE PUT
router.route('/:id').put((req, res) => {
    Agency.findByIdAndUpdate(req.params.id)
    .then(() => res.json('Agency updated'))
    .catch((err) => res.status(400).json('Error: ' + err))
});

module.exports = router;