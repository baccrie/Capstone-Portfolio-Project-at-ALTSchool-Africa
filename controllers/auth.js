const User = require('../models/users');
const genApiKey = require('../utils/generate-api-key');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const {
  createCustomError,
} = require('../middleware/custom-error');

const {
  signUpSchema,
} = require('../validation/user');

const signUp = async (req, res, next) => {
  try {
    const { error } = signUpSchema.validate(
      req.body
    );

    if (error) {
      throw createCustomError(
        error.details[0].message,
        400
      );
    }

    const { username, email, password } =
      req.body;

    // create user and save to db
    const apiKey = genApiKey.genApiKey();
    const salt = await bcrypt.genSalt(12);
    const hashedPasskey = await bcrypt.hash(
      password,
      salt
    );
    const newUser = new User({
      username,
      email,
      password: hashedPasskey,
      apiKey: apiKey,
    });

    console.log(newUser);

    res.status(201).json({
      status: 'success',
      msg: `welcome on board dev ${username} below is your apiKey keep safe for future use...`,
      apiKey,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signUp;
