async function create(req, res) {
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
}

module.exports = create;
