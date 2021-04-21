/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

function authPrivate(req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ errorMessage: 'Unauthorized' });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }
}

module.exports = authPrivate;
