const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:_id', getUserById);

router.patch('/me', patchUserProfile);

router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
