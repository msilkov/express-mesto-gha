const router = require("express").Router();
const {
	createUser,
	getUsers,
	getUserById,
	patchUserProfile,
	patchUserAvatar,
} = require("../controllers/users");
const User = require("../models/user");

router.get("/", getUsers);

router.get("/:_id", getUserById);

router.post("/", createUser);

router.patch("/me", patchUserProfile);

router.patch("/me/avatar", patchUserAvatar);

module.exports = router;
