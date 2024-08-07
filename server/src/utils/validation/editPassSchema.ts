import joi from "joi";

const editPassSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

export default editPassSchema;
