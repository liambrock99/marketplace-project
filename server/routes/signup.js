const express = require('express');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { User } = require('../models');

const router = express.Router();

async function signup(req, res) {
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
}

router.post(
  '/signup',
  asyncHandler(signup),
);

module.exports = router;
