const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { User } = require('../models');

const router = express.Router();

async function login(req, res) {
  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    return res.status(401).json({ message: 'No user found' });
  }

  // Verify password
  if (!await argon2.verify(user.password, password)) {
    return res.status(401).json({ message: 'password inavlid' });
  }

  // Start a new session
  req.session.userId = user.id;
  return res.status(200).json({ message: 'OK' });
}

router.post(
  '/login',
  asyncHandler(login),
);

module.exports = router;
