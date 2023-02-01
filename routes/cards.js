const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');
const { REG_LINK } = require('../utils/utils');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REG_LINK),
  }).unknown(true),
}), createCard);

router.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().length(24),
    }).unknown(true),
  }),
  deleteCard,
);

router.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
}), setCardLike);

router.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
}), removeCardLike);

module.exports = router;
