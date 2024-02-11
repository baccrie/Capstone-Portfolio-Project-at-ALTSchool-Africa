class customApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (message, STAUS) => {
  return new CustomApiError(message, STAUS);
};

module.exports = {
  customApiError,
  createCustomError,
};
