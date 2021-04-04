const ApiError = require('./ApiError');

function handleApiError(err, req, res, next) {
  if (err instanceof ApiError) {
    console.log('handling an ApiError');
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
}

module.exports = handleApiError;
