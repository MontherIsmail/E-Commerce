import joi from "joi";

const editPassSchema = joi.object({
  currentPassword: joi.string().required(),
  newPassword: joi.string().required(),
  confirmNewPassword: joi.string().required(),
});

export default editPassSchema;
