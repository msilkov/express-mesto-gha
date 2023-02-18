const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};

// const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U4ZjVkYzZjYTZmY2E3ZjAxOWM3YjkiLCJpYXQiOjE2NzY3MTM0OTMsImV4cCI6MTY3NzMxODI5M30.fyXR_j6KYN8mIc1IRJ-hs0b54R_91O9V1NACMO4S4Gg'; // вставьте сюда JWT, который вернул публичный сервер
// const SECRET_KEY_DEV = '222f7ea40eed03f3363eb8d1d7728dd674331a19bdc01759ff157127458001a6'; // вставьте сюда секретный ключ для разработки из кода
// try {
//   const payloadCh = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
//   console.log('\x1b[31m%s\x1b[0m', `
// Надо исправить. В продакшне используется тот же
// секретный ключ, что и в режиме разработки.
// `);
// } catch (err) {
//   if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
//     console.log(
//       '\x1b[32m%s\x1b[0m',
//       'Всё в порядке. Секретные ключи отличаются',
//     );
//   } else {
//     console.log(
//       '\x1b[33m%s\x1b[0m',
//       'Что-то не так',
//       err,
//     );
//   }
// }

module.exports = {
  auth,
};
