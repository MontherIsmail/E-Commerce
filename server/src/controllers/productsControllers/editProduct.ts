import { Request, Response } from "express";
import prisma from "../../middleware/prisma";
import { editProductSchema } from "../../utils/validation";
import cloudinaryImg from "../../utils/cloudinary";

const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const {
    name,
    price,
    description,
    category,
    image,
    productColors,
    productSizes,
    stock,
  } = req.body;
  await editProductSchema.validateAsync(req.body);
  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
    });
    if (!product) {
      return res.status(404).json({ message: "No Products Found" });
    }
    const newProductUrlImg: any = await cloudinaryImg(image);
    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(productId) },
      data: {
        productName: name,
        productUrlImg: newProductUrlImg,
        productDescription: description,
        productPrice: price,
        productCategory: category,
        productColors,
        productSizes,
        stock,
      },
    });

    res
      .status(201)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default editProduct;
