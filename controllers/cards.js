const Card = require("../models/card");
const { cardResFormat } = require("../utils/utils");

const getCard = (req, res) => {
	Card.find({})
		.then((cards) => cards.map((card) => cardResFormat(card)))
		.then((cards) => res.status(200).send(cards))
		.catch(() =>
			res.status(500).send({ message: "Произошла непредвиденная ошибка" })
		);
};

const createCard = (req, res) => {
	const { name, link } = req.body;
	const owner = req.user._id;
	Card.create({ name, link, owner })
		.then((card) => {
			res.status(200).send(cardResFormat(card));
		})
		.catch(() => {
			let err = new Error("NotValidCardData");
			err.name = "createCard";
			if (err.name === "createCard") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

const deleteCard = (req, res) => {
	Card.findByIdAndRemove(req.params._id)
		.then((card) => {
			if (!card) {
				res.status(404).send({ message: "Карточка с данным id не найдена." });
				return;
			}
			res.status(200).send(cardResFormat(card));
		})
		.catch(() => {
			let err = new Error("NotValidCardData");
			err.name = "deleteCard";
			if (err.name === "deleteCard") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

const setCardLike = (req, res) => {
	Card.findByIdAndUpdate(
		req.params._id,
		{ $addToSet: { likes: req.user._id } },
		{ new: true }
	)
		.then((card) => {
			if (!card) {
				res.status(404).send({ message: "Карточка с данным id не найдена." });
				return;
			}
			res.status(200).send(cardResFormat(card));
		})
		.catch(() => {
			let err = new Error("NotValidCardData");
			err.name = "setCardLike";
			if (err.name === "setCardLike") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

const removeCardLike = (req, res) => {
	Card.findByIdAndUpdate(
		req.params._id,
		{ $pull: { likes: req.user._id } },
		{ new: true }
	)
		.then((card) => {
			if (!card) {
				res.status(404).send({ message: "Карточка с данным id не найдена." });
				return;
			}
			res.status(200).send(cardResFormat(card));
		})
		.catch(() => {
			let err = new Error("NotValidCardData");
			err.name = "removeCardLike";
			if (err.name === "removeCardLike") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

module.exports = {
	getCard: getCard,
	createCard: createCard,
	deleteCard: deleteCard,
	setCardLike: setCardLike,
	removeCardLike: removeCardLike,
};
