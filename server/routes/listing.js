const express = require('express');
const asyncHandler = require('express-async-handler');
const { isAuthenticated, validateSchema } = require('../middleware');
const { listingSchema, idSchema } = require('../schemas');
const { User, Listing } = require('../models');

const router = express.Router();

async function create(req, res) {
  const {
    title,
    description,
    category,
    price,
  } = req.body;

  // Get user by id
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

async function ddelete(req, res) {
  const { listingId } = req.body;
  const { userId } = req.session;

  // Get listing by id
  const listing = await Listing.findByPk(listingId);
  if (!listing) {
    return res.status(400).json({ message: 'Listing does not exist' });
  }

  // Ensure user is authorized to delete
  if (listing.UserId !== userId) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await listing.destroy();
  return res.status(200).json({ message: 'OK' });
}

// Return all listings for the given user
async function all(req, res) {
  const { userId } = req.session;

  // Get user by id
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Return listings
  const listings = await user.getListings();
  return res.status(200).json({ listings });
}

router.post(
  '/listing/create',
  isAuthenticated,
  validateSchema(listingSchema),
  asyncHandler(create),
);

router.get(
  '/listing/all',
  isAuthenticated,
  asyncHandler(all),
);

router.post(
  '/listing/delete',
  isAuthenticated,
  validateSchema(idSchema),
  asyncHandler(ddelete),
);

module.exports = router;
