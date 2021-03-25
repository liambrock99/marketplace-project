const argon2 = require('argon2');
const { User } = require('../models');

async function login(req, res) {
  const { email, password } = req.body;

  // Find a user with the given email
  const user = await User.findOne({ where: { email } });
  if (user === null) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Verify password
  if (!await argon2.verify(user.password, password)) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Create new session
  req.session.userId = user.id;

  return res.status(200).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });
}

module.exports = login;
