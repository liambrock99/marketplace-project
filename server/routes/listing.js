const express = require('express');
const asyncHandler = require('express-async-handler');
const { deserializeUser, isAuthenticated } = require('../middleware');
const { Listing } = require('../models');

const router = express.Router();

async function createListing(req, res) {
  const {
    title,
    description,
    category,
    price,
    free,
  } = req.body;

  // Create new listing
  await req.user.createListing({
    title,
    description,
    category,
    price,
    free,
  });

  return res.status(201).json({ message: 'OK' });
}

async function deleteListing(req, res) {
  const { listingId } = req.body;

  await req.user.removeListing({ where: { listingId } });

  // // Get listing by id
  // const listing = await Listing.findByPk(listingId);
  // if (!listing) {
  //   return res.status(400).json({ message: 'Listing does not exist' });
  // }

  // // Ensure user is authorized to delete
  // if (listing.UserId !== userId) {
  //   return res.status(403).json({ message: 'Unauthorized' });
  // }

  // await listing.destroy();
  return res.status(200).json({ message: 'OK' });
}

// Return all listings for the current user
async function getListings(req, res) {
  // Return listings
  const listings = await req.user.getListings();
  return res.status(200).json({ listings });
}

router.post(
  '/listing/create',
  isAuthenticated,
  deserializeUser,
  asyncHandler(createListing),
);

router.get(
  '/listing/all',
  deserializeUser,
  asyncHandler(getListings),
);

router.post(
  '/listing/delete',
  deserializeUser,
  asyncHandler(deleteListing),
);

module.exports = router;
