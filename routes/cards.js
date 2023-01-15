const router = require("express").Router();
const { getCard, createCard, deleteCard } = require("../controllers/cards");
const Card = require("../models/card");

router.get("/", getCard);

router.post("/", createCard);

router.delete("/:_id", deleteCard);

module.exports = router;
