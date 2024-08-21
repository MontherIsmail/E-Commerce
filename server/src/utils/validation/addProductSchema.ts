import joi from "joi";

const addProductSchema = joi.object({
  productName: joi.string().required(),
  productImages: joi.array().required(),
  productPrice: joi.number().required(),
  productDescription: joi.string().required(),
  productCategory: joi.string().required(),
  productColors: joi.array().required(),
  productSizes: joi.array().required(),
  stock: joi.number().required(),
});

export default addProductSchema;
