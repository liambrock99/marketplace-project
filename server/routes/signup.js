const argon2 = require('argon2');
const ApiError = require('../error/ApiError');
const { User } = require('../models');

async function signup(req, res, next) {
  const {
    email,
    password,
    firstName,
    lastName,
  } = req.body;

  // Check if a user with the given email already exists
  if (await User.count({ where: { email } }) > 0) {
    return next(ApiError.badRequest('Email unavailable'));
  }

  // Hash password and create user
  const hash = await argon2.hash(password);
  await User.create({
    email,
    password: hash,
    firstName,
    lastName,
  });

  return res.status(201).json({ message: 'OK' });
}

module.exports = signup;
