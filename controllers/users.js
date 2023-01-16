const User = require("../models/user");

const getUser = (req, res) => {
	User.find({})
		.then((users) => res.send({ data: users }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const getUserById = (req, res) => {
	User.findById(req.params._id)
		.then((user) => res.send({ data: user }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

const createUser = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then((user) => res.send({ data: user }))
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
		.then((user) => res.send({ data: user }))
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
		.then((user) => res.send({ data: user }))
		.catch(() => res.status(500).send({ message: "Произошла ошибка" }));
};

module.exports = {
	createUser: createUser,
	getUser: getUser,
	getUserById: getUserById,
	patchUserProfile: patchUserProfile,
	patchUserAvatar: patchUserAvatar,
};
