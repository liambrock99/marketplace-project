require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const { register, login } = require('./routes/users');

const corsOptions = {
  origin: 'http://localhost:3000', // react app
};

const app = express();

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json(req.session.id);
});

app.use('/register', register);
app.use('/login', login);

app.listen(5000, () => console.log('Listening on port 5000'));
