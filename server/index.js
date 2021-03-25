require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');

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
app.use('/', routes);
app.listen(process.env.PORT || 5000);
