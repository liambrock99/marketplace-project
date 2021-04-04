const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../middleware');
const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const listings = require('./listings');

const router = express.Router();

router.post('/login', asyncHandler(login));
router.post('/logout', requireAuth, logout);
router.post('/signup', asyncHandler(signup));
router.use('/listings', listings);

module.exports = router;
