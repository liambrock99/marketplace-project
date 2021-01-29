require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const { register, login } = require('./routes/users');

const app = express();

app.use(morgan('dev'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json(req.session);
});

app.use('/api/register', register);
app.use('/api/login', login);

app.listen(5000, () => console.log('Listening on port 5000'));
