const router = require('express').Router();
const {
  celebrate, Joi,
} = require('celebrate');

const {
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { REG_LINK } = require('../utils/utils');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), patchUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REG_LINK),
  }).unknown(true),
}), patchUserAvatar);

module.exports = router;
