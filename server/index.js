require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/users');
const listingsRouter = require('./routes/listings');

const corsOptions = {
  origin: 'http://localhost:3000', // react app
  credentials: true, // sets Access-Control-Allow-Credentials
};

const sessionOptions = {
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: false,
    sameSite: true,
  },
};

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(session(sessionOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRouter);
app.use('/listings', listingsRouter);
app.listen(process.env.PORT || 5000);
