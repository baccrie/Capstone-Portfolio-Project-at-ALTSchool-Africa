import joi from 'joi';

const createStateSchema = joi.object({
  name: joi.string().trim().required(),
  capital: joi.string().trim().required(),
  slogan: joi.string().trim().required(),
  established: joi.string().trim().required(),
  area: joi.string().trim().required(),
  ethnic_groups: joi.array().required(),
  population: joi.object().required(),
  postal_code: joi.string().trim().required(),
  website: joi.string().trim().required().uri(),
  coordinate: joi.string().trim().required(),
  description: joi.string().trim().required(),
  lgas: joi.array().required(),
  institutions: joi.array().required(),
});

export default createStateSchema;
