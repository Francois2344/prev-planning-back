const mongoose = require('mongoose');

const adminAuthSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

const adminAuth = mongoose.model('admin', adminAuthSchema);

module.exports = adminAuth;
