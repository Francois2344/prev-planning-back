const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    agencyName: {
        type: String,
    },
});

const agency = mongoose.model("AgencyData", agencySchema)
module.exports = agency