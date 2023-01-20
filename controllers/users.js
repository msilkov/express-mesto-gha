const User = require('../models/user');
const {
  userResFormat, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR,
} = require('../utils/utils');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => users.map((user) => userResFormat(user)))
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
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
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
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
  ).orFail(() => {
    throw new Error('NotValidId');
  })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
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
  ).orFail(() => {
    throw new Error('NotValidId');
  })
    .then((user) => {
      res.status(200).send(userResFormat(user));
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
};
