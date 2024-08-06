import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const deleteProduct = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  const productId = parseInt(id);
  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return res.status(404).json({ message: "No Products Found" });
    }
    await prisma.products.delete({
      where: { id: productId },
    });
    return res.status(200).json({ messgae: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default deleteProduct;
