import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    // Always return 200 with an array; empty when no products
    return res.status(200).json({ message: "successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default getProducts;
