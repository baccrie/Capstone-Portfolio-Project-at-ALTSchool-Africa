const { customApiError } = require('./custom-error');

const { StatusCodes } = require('http-status-codes');

class UnauthenticatedError extends customApiError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
