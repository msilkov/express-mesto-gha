const userResFormat = (user) => ({
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  _id: user._id,
  email: user.email,
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
    email: card.owner.email,
  },
  createdAt: card.createdAt,
});

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const STATUS_OK = 200;

module.exports = {
  userResFormat,
  cardResFormat,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  CONFLICT,
  STATUS_OK,
};
