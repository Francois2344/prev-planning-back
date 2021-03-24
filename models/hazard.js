const mongoose = require('mongoose');

const hazardSchema = new mongoose.Schema({
    hazardName: {
        type: String,
    },
});

const hazard = mongoose.model("HazardData", hazardSchema)
module.exports = hazard;