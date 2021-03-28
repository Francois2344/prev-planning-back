const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
  },
});

const agency = mongoose.model('AgencyData', agencySchema);
module.exports = agency;
