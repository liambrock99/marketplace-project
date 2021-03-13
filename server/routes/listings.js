const express = require('express');
const asyncHandler = require('express-async-handler');
const { deserializeUser, isAuthenticated } = require('../middleware');
const { User, Listing } = require('../models');

const router = express.Router();

router.post('/',
  isAuthenticated,
  deserializeUser,
  asyncHandler(async (req, res) => {
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
  }));

// Search for listings
router.get('/', asyncHandler(async (req, res) => {
  console.log('query: ', req.query);
  const { page, limit, category } = req.query;
  const offset = (page - 1) * limit;
  const params = { offset, limit };
  if (category) params.where = { category };

  const listings = await Listing.findAll(params);

  res.status(200).json({ listings });
}));

module.exports = router;
