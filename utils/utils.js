const userResFormat = (user) => ({
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  _id: user._id,
  email: user.email,
  password: user.password,
});

const cardResFormat = (card) => ({
  likes: card.likes,
  _id: card._id,
  name: card.name,
  link: card.link,
  owner: {
    name: card.owner.name,
    about: card.owner.about,
    avatar: card.owner.avatar,
    _id: card.owner._id,
  },
  createdAt: card.createdAt,
});

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  userResFormat,
  cardResFormat,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
};
