import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res.status(404).json({ message: "No User Found" });
    }
    const cartItems = await prisma.cart.findMany({
      where: { userId: parseInt(id) },
      include: { products: true },
    });
    res.status(200).json({ message: "Successfully", cartItems });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getCart;
