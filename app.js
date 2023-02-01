require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {
  celebrate, Joi, errors,
} = require('celebrate');

const { auth } = require('./middlewares/auth');
const { NOT_FOUND, INTERNAL_SERVER_ERROR, REG_LINK } = require('./utils/utils');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(REG_LINK),

    }).unknown(true),
  }),
  createUser,
);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send({ message: 'Страница не найдена.' });
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? 'Произошла непредвиденная ошибка'
        : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
