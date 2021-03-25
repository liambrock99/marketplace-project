const express = require('express');
const asyncHandler = require('express-async-handler');
const { deserializeUser, isAuthenticated } = require('../../middleware');
const create = require('./create');
const search = require('./search');

const listings = express.Router();

listings.get('/', asyncHandler(search));
listings.post('/', isAuthenticated, deserializeUser, asyncHandler(create));

module.exports = listings;
