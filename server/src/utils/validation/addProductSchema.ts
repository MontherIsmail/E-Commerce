import joi from "joi";

const addProductSchema = joi.object({
  productName: joi.string().required(),
  productImage: joi.string().required(),
  productPrice: joi.number().required(),
  productDescription: joi.string().required(),
  productCategory: joi.string().required(),
});

export default addProductSchema;
