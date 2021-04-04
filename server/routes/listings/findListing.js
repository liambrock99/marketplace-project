const ApiError = require('../../error/ApiError');
const { Listing } = require('../../models');

// Attempts to find a listing by listingId
async function findListing(req, res, next) {
  const { listingId } = req.params;
  const listing = await Listing.findByPk(listingId);

  if (!listing) {
    return next(ApiError.notFound(`Couldn't find listing ${listingId}`));
  }

  return res.status(200).json({ listing });
}

module.exports = findListing;
