const { customApiError } = require('./custom-error');

const { StatusCodes } = require('http-status-codes');

class BadRequest extends customApiError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
