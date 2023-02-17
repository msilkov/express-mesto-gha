const { NODE_ENV, JWT_SECRET = '88005553535', PORT = 3000 } = process.env;

module.exports = {
  NODE_ENV, JWT_SECRET, PORT,
};
