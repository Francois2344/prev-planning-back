const mongoose = require('mongoose');


const prevSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    lastName : {
        type: String,
        required: true,
        unique: true
    },
});

const preventer = mongoose.model('preventer', prevSchema);
module.exports = preventer;

