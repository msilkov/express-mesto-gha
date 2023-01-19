const Card = require('../models/card');
const {
  cardResFormat, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR,
} = require('../utils/utils');

const getCard = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => cards.map((card) => cardResFormat(card)))
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      res.status(200).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const setCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      res.status(200).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

const removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      res.status(200).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotValidId') {
        res
          .status(NOT_FOUND)
          .send({ message: 'Карточка с данным id не найдена' });
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Произошла непредвиденная ошибка' });
      }
    });
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
};
