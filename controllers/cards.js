const Card = require('../models/card');
const { cardResFormat, STATUS_OK } = require('../utils/utils');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-req-err');
const AuthError = require('../errors/auth-err');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => cards.map((card) => cardResFormat(card)))
    .then((cards) => res.status(STATUS_OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_OK).send(cardResFormat(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params._id)
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      const currnetUser = req.user._id;
      const cardOwner = card.owner._id.toString();
      if (currnetUser === cardOwner) {
        return Card.findByIdAndRemove(req.params._id).then(
          res.status(STATUS_OK).send(cardResFormat(card)),
        );
      }
      throw new Error('NotOwner');
    })
    .catch((err) => {
      if (err.message === 'NotOwner') {
        throw new AuthError('Можно удалять только свои карточки');
      }
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
    })
    .catch(next);
};

const setCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      res.status(STATUS_OK).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
    })
    .catch(next);
};

const removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotValidId');
    })
    .then((card) => {
      res.status(STATUS_OK).send(cardResFormat(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка с данным id не найдена');
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
};
