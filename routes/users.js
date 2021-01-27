const argon2 = require('argon2');
const db = require('../sequelize');

const { User } = db.models;

async function register(req, res, next) {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const count = await User.count({ where: { email } });

      if (count > 0) {
        res.status(400).json({ message: 'Failed to register user: User already exists' });
      } else {
        const hash = await argon2.hash(password);
        User.create({ email, password: hash });
        res.status(201).json({ message: 'Successfully registered user' });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.status(400).json({ message: 'Missing field' });
  }
}

function login(req, res) {
  res.send('Hello /login');
}

module.exports = {
  register,
  login,
};
