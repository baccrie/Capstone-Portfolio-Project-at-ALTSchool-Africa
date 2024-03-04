import Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required().trim(),
  password: Joi.string().required().alphanum().trim(),
});
