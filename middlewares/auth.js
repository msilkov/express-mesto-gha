const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { NODE_ENV, JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production node server.js' ? JWT_SECRET : 'dev-some-secret-key');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2OTRlODZjNjFkYWI3YTMzYmZiZGUiLCJpYXQiOjE2NzY2NTQyMjcsImV4cCI6MTY3NzI1OTAyN30.omEvCu8yNfAg-q8ObdhwIkgWjaGrbtPSJrIQqEfa7Y8'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = '222f7ea40eed03f3363eb8d1d7728dd674331a19bdc01759ff157127458001a6'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payloadCh = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Что-то не так',
      err,
    );
  }
}

module.exports = {
  auth,
};
