const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { User } = require('../models');

const router = express.Router();

router.post('/login', asyncHandler(async (req, res) => {
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

  // Create new session
  req.session.userId = user.id;
  return res.status(200).json({ firstName: user.firstName });
}));

router.post('/signup', asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
  } = req.body;

  // Check if a user with the given email already exists
  if (await User.count({ where: { email } }) > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password and create user
  const passwordHash = await argon2.hash(password);
  await User.create({
    email,
    password: passwordHash,
    firstName,
    lastName,
  });
  return res.status(201).json({ message: 'OK' });
}));

module.exports = router;
