const Joi = require('joi');

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().required().alphanum(),
});

module.exports = { signUpSchema };
