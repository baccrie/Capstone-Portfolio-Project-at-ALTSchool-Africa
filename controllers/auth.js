const User = require('../models/user');
const genApiKey = require('../utils/generate-api-key');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const BadRequestError = require('../errors/bad-request');

const { signUpSchema } = require('../validation/user');

const signUp = async (req, res, next) => {
  try {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      throw BadRequestError(error.details[0].message);
    }

    const { username, email, password } = req.body;

    // check if user exists
    const checkUser = await User.findOne({
      email,
    });

    if (checkUser) {
      throw new BadRequestError('User with email already exists.');
    }

    // hash password and gen api-key
    const apiKey = genApiKey.genApiKey();
    const salt = await bcrypt.genSalt(12);
    const hashedPasskey = await bcrypt.hash(password, salt);

    console.log(username, email, apiKey);
    // create new User
    const newUser = await User.create({
      username,
      email,
      password: hashedPasskey,
      api_key: apiKey,
    });

    //await newUser.save();
    console.log(newUser);

    res.status(201).json({
      status: 'success',
      msg: `welcome on board dev ${username} below is your apiKey, please keep it safe.`,
      api_key: apiKey,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = signUp;
