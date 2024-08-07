import joi from "joi";

const editProfileSchema = joi.object({
  userEmail: joi.string().email().required(),
  userName: joi.string().required(),
});

export default editProfileSchema;
