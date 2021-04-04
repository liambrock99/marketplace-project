async function createListing(req, res) {
  const {
    title,
    description,
    category,
    location,
    price,
  } = req.body;

  console.log(req.body);

  // Create new listing
  const listing = await req.user.createListing({
    title,
    description,
    category,
    location,
    price,
  });

  return res.status(201).json({ listing });
}

module.exports = createListing;
