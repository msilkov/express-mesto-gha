const { FORBIDDEN } = require('../utils/utils');

class ForbiddenError extends Error {
  constructor(marker, message) {
    super(message);
    this.statusCode = FORBIDDEN;
    this.message = 'У пользователя не хватает прав доступа к запрашиваемому ресурсу';
    this.marker = this.messageHandler(marker);
  }

  messageHandler(marker) {
    if (marker === 'card') {
      this.message = 'Можно удалять только свои карточки';
    }
  }
}
module.exports = ForbiddenError;
