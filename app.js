require('dotenv').config();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { auth } = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('./middlewares/requetsValidation');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { incorrectRouteHandler } = require('./middlewares/incorrectRouteHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.use('*', incorrectRouteHandler);

app.use(errorLogger);

app.use(errors()); // celebrate error handler
app.use(errorsHandler); // centralized error handler

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
