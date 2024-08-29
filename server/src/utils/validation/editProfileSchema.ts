import joi from "joi";

const editProfileSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().required(),
});

export default editProfileSchema;
