import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const resetCart = async (req: Request, res: Response) => {
  const { userId } = req.params;  
  try {
    const data = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!data) {
      return res.status(404).json({ message: "No User Found" });
    }    
    await prisma.cart.deleteMany({
      where: {
        userId: parseInt(userId),
      },
    });    
    return res.status(200).json({ messgae: "Successfully, Cart now empty" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default resetCart;
