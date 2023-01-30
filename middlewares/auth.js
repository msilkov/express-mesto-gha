const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
