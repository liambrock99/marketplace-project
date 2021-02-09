const express = require('express');
const asyncHandler = require('express-async-handler');
const { body } = require('express-validator');
const { isAuthenticated, checkValidationResult } = require('../middleware');
const { User } = require('../models');

const router = express.Router();

async function create(req, res) {
  const {
    title,
    description,
    category,
    price, // convert to float at somepoint
  } = req.body;

  // Get user from session
  const { userId } = req.session;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Create new listing
  await user.createListing({
    title,
    description,
    category,
    price,
  });

  return res.status(201).json({ message: 'OK' });
}

// Return all listings for the given user
async function all(req, res) {
  const { userId } = req.session;

  // Get user from session
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Return listings
  const listings = await user.getListings();
  return res.status(200).json({ listings });
}

router.post(
  '/listings/create',
  isAuthenticated,
  body('title').not().isEmpty().trim()
    .escape(),
  body('description').not().isEmpty().trim()
    .escape(),
  body('category').not().isEmpty().trim()
    .escape(),
  body('price').isFloat({ min: 0.00 }),
  checkValidationResult,
  asyncHandler(create),
);

router.get(
  '/listings/all',
  isAuthenticated,
  asyncHandler(all),
);

module.exports = router;
