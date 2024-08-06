import { Request, Response } from "express";
import { addProductSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import cloudinaryImg from "../../utils/cloudinary";

const addProduct = async (req: Request, res: Response) => {
  const {
    productName,
    productImage,
    productPrice,
    productDescription,
    productCategory,
  } = req.body;
  await addProductSchema.validateAsync(req.body);
  const productUrlImg: any = await cloudinaryImg(productImage);
  try {
    const newProduct = await prisma.products.create({
      data: {
        productName,
        productUrlImg,
        productPrice,
        productDescription,
        productCategory,
      },
    });
    return res
      .status(201)
      .json({ message: "Product Added Successfully", newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default addProduct;
