const { BAD_REQUEST } = require('../utils/utils');

class BadRequestError extends Error {
  constructor(marker, message) {
    super(message);
    this.statusCode = BAD_REQUEST;
    this.message = 'Переданы некорректные данные';
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Card mes';
    } else if (marker === 'user') {
      this.message = 'User mes';
    }
  }
}

module.exports = BadRequestError;
