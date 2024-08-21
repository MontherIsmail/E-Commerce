import { Request, Response } from "express";
import { addProductSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import cloudinaryImg from "../../utils/cloudinary";

const addProduct = async (req: Request, res: Response) => {
  const {
    productName,
    productImages,
    productPrice,
    productDescription,
    productCategory,
    productColors,
    productSizes,
    stock,
  } = req.body;
  await addProductSchema.validateAsync(req.body);

  const productUrlImgs = await Promise.all(
    productImages.map(async (productImage: any) => {
      const url = await cloudinaryImg(productImage);
      return url;
    })
  );
  try {
    const newProduct = await prisma.products.create({
      data: {
        productName,
        productUrlImgs,
        productPrice,
        productDescription,
        productCategory,
        productColors,
        productSizes,
        stock,
      },
    });
    return res
      .status(201)
      .json({ message: "Product Added Successfully", newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default addProduct;
