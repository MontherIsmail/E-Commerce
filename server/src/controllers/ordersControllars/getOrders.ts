import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const isExitingUser = await prisma.users.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!isExitingUser) {
      return res.status(404).json({ message: "User Dose Not Found!" });
    }
    // const orders = await prisma.order.findMany({
    //   where: {userId : parseInt(userId)}
    // });
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        items: {
          include: {
            products: true,
          },
        },
        payment: true,
      },
    });
    if(orders.length === 0){
        return res.status(404).json({message: "No Orders Found"})
    }
    return res.status(200).json({ messgae: "successfully", orders });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getOrders;
