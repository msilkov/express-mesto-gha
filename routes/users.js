const router = require("express").Router();
const { createUser, getUser, getUserById } = require("../controllers/users");
const User = require("../models/user");

router.get("/", getUser);

router.get("/:_id", getUserById);

router.post("/", createUser);

module.exports = router;
