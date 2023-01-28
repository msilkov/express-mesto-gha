const router = require('express').Router();
const {
  getUsers,
  getUserById,
  patchUserProfile,
  patchUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:_id', getUserById);

router.get('/me', getCurrentUser);

router.patch('/me', patchUserProfile);

router.patch('/me/avatar', patchUserAvatar);

module.exports = router;
