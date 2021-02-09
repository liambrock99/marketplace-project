const { validationResult } = require('express-validator');

// Checks the validationResult for any errors raised in the validator/sanitizer middlewares.
// Exits early if any errors were found and sends a JSON response.
function checkValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  return next();
}

// Exits early if the user is not authenticated.
// A user is authenticated if userId exists in req.session
function isAuthenticated(req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    return res.status(400).json({ message: 'Not logged in' });
  }
  return next();
}

module.exports = {
  checkValidationResult,
  isAuthenticated,
};
