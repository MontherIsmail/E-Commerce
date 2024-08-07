import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getProfile = async (req: Request, res: Response) => {
  const { id }: any = req.params;
  try {
    const data = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res.status(404).json({ message: "No User Found" });
    }
    const { email, username, role } = data;
    const profileData = { email, username, role };
    return res.status(200).json({ message: "successfully", profileData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getProfile;
