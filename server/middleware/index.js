// Exits early if the user is not authenticated.
// A user is authenticated if userId exists in req.session
function isAuthenticated(req, res, next) {
  const { userId } = req.session;
  if (!userId) {
    return res.status(400).json({ message: 'Not logged in' });
  }
  return next();
}

// Returns a middleware that validates a given Joi schema using validateAsync()
// Exits early if validateAsync rejects with errors
function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body);
      req.body = value;
      return next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
}

module.exports = {
  isAuthenticated,
  validateSchema,
};
