const db = require('../sequelize');

async function register(req, res, next) {
  const jeff = await db.models.user.create({
    email: 'jeff@exampl.com',
    password: 'mynamejeff',
  });

  res.send(jeff);
}

function login(req, res) {
  res.send('Hello /login');
}

module.exports = {
  register,
  login,
};
