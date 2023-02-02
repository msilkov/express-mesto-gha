const { CONFLICT } = require('../utils/utils');

class ConflictError extends Error {
  constructor(marker, message) {
    super(message);
    this.statusCode = CONFLICT;
    this.message = 'Конфликтное обращение к ресурсу';
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'email') {
      this.message = 'Пользователь с таким email уже существует';
    }
  }
}
module.exports = ConflictError;
