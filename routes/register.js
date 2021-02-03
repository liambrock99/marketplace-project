const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
async function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, username } = req.body;

  // Check if a user with the given email already exists
  if (await User.count({ where: { email } }) > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password and create user
  const passwordHash = await argon2.hash(password);
  await User.create({ email, password: passwordHash, username });
  return res.status(201).json({ message: 'OK' });
}

router.post(
  '/register',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().escape(),
  body('username').not().isEmpty().escape(),
  asyncHandler(register),
);

module.exports = router;
