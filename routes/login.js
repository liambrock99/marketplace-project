const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { body, validationResult } = require('express-validator');
const { User } = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
async function login(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    return res.status(400).json({ message: 'No user found' });
  }

  // Verify password
  if (!await argon2.verify(user.password, password)) {
    return res.status(400).json({ message: 'password inavlid' });
  }

  // Start a new session
  req.session.user = user.id;
  return res.status(201).json({ message: 'OK' });
}

router.post(
  '/login',
  body('email').isEmail().normalizeEmail(),
  body('password').not().isEmpty().escape(),
  asyncHandler(login),
);

module.exports = router;
