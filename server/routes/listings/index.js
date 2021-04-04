const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../middleware');
const createListing = require('./createListing');
const findListing = require('./findListing');
const deleteListing = require('./deleteListing');
const search = require('./search');

const listings = express.Router();

listings.get('/', asyncHandler(search));
/*
  POST /listings
  - Create a new listing
*/
listings.post('/', requireAuth, asyncHandler(createListing));

/*
  GET /listings/listingID
  - Retrieve a listing by ID
*/
listings.get('/:listingId', asyncHandler(findListing));

/*
  PUT /listings/listingID
  - Update a listing by ID
*/
// listings.put('/:listingID', requireAuth, asyncHandler(updateListing));

/*
  DELETE /listings/listingID
*/
listings.delete('/:listingId', requireAuth, asyncHandler(deleteListing));

module.exports = listings;
