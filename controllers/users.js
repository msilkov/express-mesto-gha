const e = require("express");
const User = require("../models/user");
const { userResFormat } = require("../utils/utils");

const getUsers = (req, res) => {
	User.find({})
		.then((users) => users.map((user) => userResFormat(user)))
		.then((users) => res.status(200).send(users))
		.catch(() => {
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

const getUserById = (req, res) => {
	User.findById(req.params._id)
		.then((user) => {
			if (!user) {
				res
					.status(404)
					.send({ message: "Запрашиваемый пользователь не найден" });
				return;
			}
			res.status(200).send(userResFormat(user));
		})
		.catch(() => {
			let err = new Error("NotValidUserId");
			err.name = "getUserById";
			if (err.name === "getUserById") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

const createUser = (req, res) => {
	const { name, about, avatar } = req.body;
	User.create({ name, about, avatar })
		.then((user) => {
			res.status(200).send(userResFormat(user));
		})
		.catch(() => {
			let err = new Error("NotValidUserData");
			err.name = "createUser";
			if (err.name === "createUser") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
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
		.then((user) => {
			if (!user) {
				res
					.status(404)
					.send({ message: "Запрашиваемый пользователь не найден" });
				return;
			}

			res.status(200).send(userResFormat(user));
		})
		.catch(() => {
			let err = new Error("NotValidUserData");
			err.name = "patchUserProfile";
			if (err.name === "patchUserProfile") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
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
		.then((user) => {
			if (!user) {
				res
					.status(404)
					.send({ message: "Запрашиваемый пользователь не найден" });
				return;
			}

			res.status(200).send(userResFormat(user));
		})
		.catch(() => {
			let err = new Error("NotValidUserAvatar");
			err.name = "patchUserAvatar";
			if (err.name === "patchUserAvatar") {
				res.status(400).send({ message: "Переданы некорректные данные" });
				return;
			}
			res.status(500).send({ message: "Произошла непредвиденная ошибка" });
		});
};

module.exports = {
	createUser: createUser,
	getUsers: getUsers,
	getUserById: getUserById,
	patchUserProfile: patchUserProfile,
	patchUserAvatar: patchUserAvatar,
};
