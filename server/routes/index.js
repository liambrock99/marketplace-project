const express = require('express');
const asyncHandler = require('express-async-handler');
const login = require('./login');
const signup = require('./signup');
const listings = require('./listings');

const router = express.Router();

router.post('/login', asyncHandler(login));
router.post('/signup', asyncHandler(signup));
router.use('/listings', listings);

module.exports = router;
