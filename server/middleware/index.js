const ApiError = require('../error/ApiError');
const { User } = require('../models');

// Require authenticated users for a route
async function requireAuth(req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    next(ApiError.unauthorized('Unauthorized'));
  } else {
    req.user = await User.findByPk(req.session.userId);
    next();
  }
}

module.exports = {
  requireAuth,
};
