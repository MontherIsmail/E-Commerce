import joi from "joi";

const editProductSchema = joi.object({
  name: joi.string().required(),
  images: joi.array().required(),
  price: joi.number().required(),
  description: joi.string().required(),
  category: joi.string().required(),
  productColors: joi.array().required(),
  productSizes: joi.array().required(),
  stock: joi.number().required(),
});

export default editProductSchema;
