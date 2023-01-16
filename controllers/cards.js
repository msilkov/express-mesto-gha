const Card = require("../models/card");
const { cardResFormat } = require("../utils/utils");

const getCard = (req, res) => {
	Card.find({})
		.then((cards) => cards.map((card) => cardResFormat(card)))
		.then((cards) => res.send(cards))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const createCard = (req, res) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then((card) => res.send(cardResFormat(card)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const deleteCard = (req, res) => {
	Card.findByIdAndRemove(req.params._id)
		.then((card) => res.send(cardResFormat(card)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const setCardLike = (req, res) => {
	Card.findByIdAndUpdate(
		req.params._id,
		{ $addToSet: { likes: req.user._id } },
		{ new: true }
	)
		.then((card) => res.send(cardResFormat(card)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const removeCardLike = (req, res) => {
	Card.findByIdAndUpdate(
		req.params._id,
		{ $pull: { likes: req.user._id } },
		{ new: true }
	)
		.then((card) => res.send(cardResFormat(card)))
		.catch(() =>
			res.status(500).send({ message: "На сервере произошла ошибка" })
		);
};

module.exports = {
	getCard: getCard,
	createCard: createCard,
	deleteCard: deleteCard,
	setCardLike: setCardLike,
	removeCardLike: removeCardLike,
};
