const mongoose = require('mongoose');

const otherSchema = new mongoose.Schema({
  otherName: {
    type: String,
  },
});

const other = mongoose.model('OtherData', otherSchema);
module.exports = other;
