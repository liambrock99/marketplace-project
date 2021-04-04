const argon2 = require('argon2');
const ApiError = require('../error/ApiError');
const { User } = require('../models');

async function login(req, res, next) {
  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(ApiError.badRequest('Invalid username or password'));
  }

  // Verify password
  if (!await argon2.verify(user.password, password)) {
    return next(ApiError.badRequest('Invalid username or password'));
  }

  // Create new session
  req.session.userId = user.id;

  return res.status(200).json({ firstName: user.firstName, lastName: user.lastName });
}

module.exports = login;
