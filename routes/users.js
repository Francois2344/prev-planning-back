const router = require ('express').Router;
let User = require('../models/preventer');

router.route('/').get((req,res)=> {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/insert').post((req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const newUser = new User ({firstName, lastName});

    newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/delete').delete((req, res) => {
    const user = User.deleteOne()
})


module.exports = router;