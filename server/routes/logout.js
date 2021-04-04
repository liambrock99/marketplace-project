function logout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: 'OK' });
    }
  });
}

module.exports = logout;
