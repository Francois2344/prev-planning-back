const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  siteName: {
    type: String,
  },
});

const site = mongoose.model('SiteData', siteSchema);
module.exports = site;
