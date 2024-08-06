import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getProduct = async (req: Request, res: Response) => {
    const { id }: any = req.params;    
  try {
    const product = await prisma.products.findUnique({
        where: {id: parseInt(id)}
    });    
    if(!product){
        return res.status(404).json({message: "No Products Found"})
    }
    return res.status(200).json({ messgae: "successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getProduct;
