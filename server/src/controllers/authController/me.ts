import { Request, Response } from "express";
import { verifyToken } from "../../utils/jwt";
import prisma from "../../middleware/prisma";

const me = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const privateKey = process.env.PRIVATE_KEY as string;
    const payload: any = await verifyToken(token, privateKey);
    const { id } = payload || {};
    if (!id) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    // Fetch full user data from database
    const user = await prisma.users.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        permissions: true,
      },
    });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default me;