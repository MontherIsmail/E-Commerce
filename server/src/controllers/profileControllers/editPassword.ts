import { Request, Response } from "express";
import { editPassSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import { comparePassword, hashPassword } from "../../utils/password";

const editPassword = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { oldPassword, newPassword } = req.body;
  await editPassSchema.validateAsync(req.body);
  try {
    const currentProfileData = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    if (!currentProfileData) {
      return res.status(404).json({ message: "user not found" });
    }
    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "your new password matching your old password" });
    }
    const { password }: any = currentProfileData;
    const isMatch = await comparePassword(oldPassword, password);
    if (!isMatch) {
      return res.status(400).json({ message: "wrong password !" });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        password: hashedNewPassword,
      },
    });
    return res.status(200).json({ message: "password edited" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default editPassword;
