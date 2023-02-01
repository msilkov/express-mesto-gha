const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  userResFormat, STATUS_OK,
} = require('../utils/utils');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const ConflictError = require('../errors/conflict-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
    })
    .catch(next);
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => users.map((user) => userResFormat(user)))
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(STATUS_OK).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch(next);
};

const patchUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch(next);
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )

    .then((user) => {
      res.status(STATUS_OK).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
  getCurrentUser,
};
