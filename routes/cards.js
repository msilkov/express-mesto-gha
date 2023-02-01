const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  setCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:_id', deleteCard);

router.put('/:_id/likes', setCardLike);

router.delete('/:_id/likes', removeCardLike);

module.exports = router;
