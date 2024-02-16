const { customApiError } = require('../errors/custom-error');

const errorHandler = (error, req, res, next) => {
  if (error instanceof customApiError) {
    return res.status(error.statusCode).json({
      status: 'failed',
      msg: error.message,
    });
  }

  res.status(500).json({
    msg: 'An unknwon error occured',
  });
};

module.exports = { errorHandler };
