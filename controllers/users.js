const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  userResFormat,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require('../utils/utils');

const login = (req, res) => {
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
    .catch((err) => {
      res.status(UNAUTHORIZED).send({
        message: err.message,
      });
    });
};

const createUser = (req, res) => {
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
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};
const getCurrentUser = (req, res) => {
  User.findById(req.cookies.jwt)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => users.map((user) => userResFormat(user)))
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: 'Произошла непредвиденная ошибка' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const patchUserProfile = (req, res) => {
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
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const patchUserAvatar = (req, res) => {
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
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
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
