const argon2 = require('argon2');
const db = require('../sequelize');

const { User } = db.models;

async function register(req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const count = await User.count({ where: { email } });

      if (count > 0) {
        res.status(400).json({ message: 'User already exists' });
      } else {
        const hash = await argon2.hash(password);
        User.create({ email, password: hash });
        res.status(201).json({ message: 'Registration successful' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.status(400).json({ message: 'Missing field(s)' });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    try {
      // Try to find user with email
      const user = await User.findOne({ where: { email } });
      if (user) {
        // Compare passwords
        if (await argon2.verify(user.password, password)) {
          // Store uid in session
          console.log(`userid: ${user.id}`);
          req.session.id = user.id;
          res.status(201).json({ message: 'Login successful' });
        } else {
          res.status(400).json({ message: 'Incorrect password' });
        }
      } else {
        res.status(400).json({ message: 'User not found' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.status(400).json({ message: 'Misisng field(s)' });
  }
}

module.exports = {
  register,
  login,
};
