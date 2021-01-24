require('dotenv').config();
const { Sequelize } = require('sequelize');
const userModel = require('./models/userModel');

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, { dialect: 'postgres' });

sequelize.authenticate()
  .then(() => console.log('Successfully connected to database'))
  .catch((err) => console.error(err));

userModel(sequelize);

sequelize.sync({ force: true });

module.exports = sequelize;
