const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { body } = require('express-validator');
const { User } = require('../models');
const { checkValidationResult } = require('../middleware');

const router = express.Router();

async function register(req, res) {
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
  body('password').not().isEmpty().trim()
    .escape(),
  body('username').not().isEmpty().trim()
    .escape(),
  checkValidationResult,
  asyncHandler(register),
);

module.exports = router;
