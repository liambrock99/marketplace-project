const { Listing } = require('../../models');

async function search(req, res) {
  console.log('query: ', req.query);
  const { page, limit, category } = req.query;
  const offset = (page - 1) * limit;
  const params = { offset, limit };
  if (category) params.where = { category };

  const listings = await Listing.findAll(params);

  res.status(200).json({ listings });
}

module.exports = search;
