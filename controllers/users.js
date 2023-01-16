const User = require("../models/user");
const { userResFormat } = require("../utils/utils");

const getUsers = (req, res) => {
	User.find({})
		.then((users) => users.map((user) => userResFormat(user)))
		.then((users) => res.send(users))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUserById = (req, res) => {
	User.findById(req.params._id)
		.then((user) => res.send(userResFormat(user)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const createUser = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then((user) =>
			res.send(userResFormat(user))
		)
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const patchUserProfile = (req, res) => {
	const { name, about } = req.body;
	const owner = req.user._id;

	User.findByIdAndUpdate(
		owner,
		{
			name: name,
			about: about,
		},
		{
			new: true,
			runValidators: true,
		}
	)
		.then((user) => res.send(userResFormat(user)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const patchUserAvatar = (req, res) => {
	const { avatar } = req.body;
	const owner = req.user._id;

	User.findByIdAndUpdate(
		owner,
		{
			avatar: avatar,
		},
		{
			new: true,
			runValidators: true,
		}
	)
		.then((user) => res.send(userResFormat(user)))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
	createUser: createUser,
	getUsers: getUsers,
	getUserById: getUserById,
	patchUserProfile: patchUserProfile,
	patchUserAvatar: patchUserAvatar,
};
