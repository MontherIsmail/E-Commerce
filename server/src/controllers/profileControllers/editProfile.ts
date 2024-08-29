import { Request, Response } from "express";
import { editProfileSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import { createToken } from "../../utils/jwt";

const editProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, username } = req.body;
  await editProfileSchema.validateAsync(req.body);
  try {
    const data = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      return res.status(404).json({ message: "No User Found" });
    }
    const { role } = data;
    const emailData = await prisma.users.findUnique({
      where: { email: email },
    });
    if (!emailData) {
      return res
        .status(422)
        .json({ message: "email already exist, try another one" });
    }
    const updatedProfile = await prisma.users.update({
      where: { id: parseInt(id) },
      data: {
        email: email,
        username: username,
      },
    });

    const token = await createToken({
      id,
      role,
      username,
    });
    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: false,
      })
      .json({ message: "Profile edited Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default editProfile;
