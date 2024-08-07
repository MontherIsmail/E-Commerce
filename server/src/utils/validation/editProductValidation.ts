import joi from "joi";

const editProductSchema = joi.object({
  name: joi.string().required(),
  image: joi.string().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  category: joi.string().required(),
});

export default editProductSchema;
