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
		.then((cards) => res.send({ data: cards }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

router.delete("/:_id", (req, res) => {
	Card.findById(req.params._id)
		.then((cards) => res.send({ data: cards }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
});

module.exports = router;
