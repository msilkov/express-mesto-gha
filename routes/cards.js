const router = require('express').Router();
const {
  getCard,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCard);

router.post('/', createCard);

router.delete('/:_id', deleteCard);

router.put('/:_id/likes', setCardLike);

router.delete('/:_id/likes', removeCardLike);

module.exports = router;
