const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { User } = require('../models');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
async function register(req, res, next) {
  const { email, password, username } = req.body;

  if (email && password && username) {
    const count = await User.count({ where: { email } });

    // If count is 0 the user is not registered yet
    if (count === 0) {
      const hash = await argon2.hash(password);
      User.create({ email, password: hash, username });
      return res.status(201).json({ message: 'OK' });
    }

    return res.status(400).json({ message: 'User already exists' });
  }

  return res.status(400).json({ message: 'Missing fields' });
}

router.post('/register', asyncHandler(register));

module.exports = router;
