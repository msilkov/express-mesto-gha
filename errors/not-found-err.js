const { NOT_FOUND } = require('../utils/utils');

class NotFoundError extends Error {
  constructor(marker, message) {
    super(message);
    this.statusCode = NOT_FOUND;
    this.message = 'Передан некорректный идентификатор';
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Карточка с данным id не найдена';
    } else if (marker === 'user') {
      this.message = 'Запрашиваемый пользователь не найден';
    } else if (marker === 'page') {
      this.message = 'Страница не найдена';
    }
  }
}
module.exports = NotFoundError;
