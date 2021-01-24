const express = require('express');
const { register, login } = require('./routes/users');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Hello :)');
});

app.use('/api/register', register);
app.use('/api/login', login);

app.listen(3000, () => console.log('Listening on port 3000'));
