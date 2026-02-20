const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ success: false, error: { message: errors.errors[0].msg } });
}

module.exports = { validateRequest };
