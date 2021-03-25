const mongoose = require('mongoose');


const prevSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname : {
        type: String,
        required: true,
        unique: true
    },
});

const preventer = mongoose.model('preventer', prevSchema);
module.exports = preventer;

