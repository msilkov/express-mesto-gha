const router = require("express").Router();
const Card = require("../models/card");

router.get("/", (req, res) => {
	Card.find({})
		.then((cards) => res.send({ data: cards }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

router.post("/", (req, res) => {
	const { name, link } = req.body;
	Card.create({ name, link })
		.then((card) => res.send({ data: card }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

router.delete("/:_id", (req, res) => {
	Card.findByIdAndRemove(req.params._id)
		.then((card) => res.send({ data: card }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

module.exports = router;
