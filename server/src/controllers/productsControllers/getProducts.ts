import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany();
    if(products.length === 0){
        return res.status(404).json({message: "No Products Found"})
    }
    return res.status(200).json({ messgae: "successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getProducts;
