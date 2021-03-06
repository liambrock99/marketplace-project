const { User } = require('../models');

// Checks if the user is authenticated.
// A user is authenticated if session.userId exists.
function isAuthenticated(req, res, next) {
  if (!req.session.userId) return res.status(400).json({ message: 'Not authenticated' });
  return next();
}

// Fetches the user from the database and attaches the user instance to the request object.
// This should be called after isAuthenticated.
async function deserializeUser(req, res, next) {
  const user = await User.findByPk(req.session.userId);
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  req.user = user;
  return next();
}

module.exports = {
  isAuthenticated,
  deserializeUser,
};
