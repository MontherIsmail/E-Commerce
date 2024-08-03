import joi from 'joi';

const signUpSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().required(),
});

export default signUpSchema;