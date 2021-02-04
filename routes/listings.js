const express = require('express');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { Listing, User } = require('../models');

const router = express.Router();

async function create(req, res, next) {
  const {
    title,
    description,
    category,
  } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const { userId } = req.session;
  if (!userId) {
    return res.status(400).json({ message: 'Not logged in' });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  await user.createListing({
    title,
    description,
    category,
  });

  return res.status(201).json({ message: 'OK' });
}

// list all for user
async function all(req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    return res.status(400).json({ message: 'Not logged in' });
  }

  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const listings = await user.getListings();
  return res.status(200).json({ listings });
}

router.post('/listings/create', asyncHandler(create));
router.get('/listings/all', asyncHandler(all));

module.exports = router;
