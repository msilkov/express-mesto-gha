require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { auth } = require('./middlewares/auth');

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./utils/utils');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена.' });
});

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_ERROR ? 'Произошла непредвиденная ошибка' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
