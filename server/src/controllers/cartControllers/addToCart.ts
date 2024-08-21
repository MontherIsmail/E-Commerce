import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const addToCart = async (req: Request, res: Response) => {  
  const { productId, userId, quantity, selectedColor, selectedSize } = req.body.data;
  console.log('ll', req.body.data);
  
  try {
    const isExitingUser = await prisma.users.findUnique({
      where: { id: userId },
    });
    if (!isExitingUser) {
      return res.status(404).json({ message: "User Dose Not Exit!" });
    }
    const isExitingProduct = await prisma.products.findUnique({
      where: { id: productId },
    });
    if (!isExitingProduct) {
      return res.status(404).json({ message: "Product Dose Not Exit!" });
    }
    const cartItem = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      update: {
        quantity: { increment: quantity },
        color: selectedColor,
        size: selectedSize
      },
      create: {
        userId: userId,
        productId: productId,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
      },
    });
    return res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default addToCart;
