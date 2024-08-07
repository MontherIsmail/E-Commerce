import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const addToCart = async (req: Request, res: Response) => {
  const { productId, userId, quantity } = req.body;
  try {
    const cartItem = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: userId,
        productId: productId,
        quantity: quantity,
      },
    });
    return res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default addToCart;
