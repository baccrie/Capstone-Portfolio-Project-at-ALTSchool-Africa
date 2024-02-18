const authenticationError = require('../errors/unauthenticated');
const User = require('../models/user');

const checkApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers.apikey;

    if (!apiKey) {
      throw new authenticationError('api key is missing');
    }

    // validate key
    const check = await User.findOne({
      api_key: apiKey,
    });

    if (!check) {
      throw new authenticationError('Unauthorized!!!');
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkApiKey;
