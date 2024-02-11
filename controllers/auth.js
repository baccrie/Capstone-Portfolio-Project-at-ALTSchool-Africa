const User = require('../models/users');
const genApiKey = require('../utils/generate-api-key');

const signUp = (req, res, next) => {
  const { username, email, password } = req.body;
  const apiKey = genApiKey.genApiKey();
  const newUser = User.create({
    username,
    email,
    password,
    apiKey: apiKey,
  });

  res.status(201).json({
    status: 'success',
    msg: 'below is your apiKey keep safe for future use...',
    apiKey,
  });
};

module.exports = signUp;
