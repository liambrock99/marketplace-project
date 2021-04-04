const ApiError = require('../../error/ApiError');
const { Listing } = require('../../models');

// Attempt to delete the listing given by listingID
// Only the owner can delete their listing
async function deleteListing(req, res, next) {
  const { listingId } = req.params;
  const { userId } = req.session;
  const listing = await Listing.findByPk(listingId);

  if (!listing) {
    return next(ApiError.notFound(`Listing ${listingId} does not exist`));
  }

  if (listing.userId !== userId) {
    return next(ApiError.unauthorized(`Not authorized to delete listing ${listingId}`));
  }

  await listing.destroy();
  return res.status(200).json({ listing });
}

module.exports = deleteListing;
