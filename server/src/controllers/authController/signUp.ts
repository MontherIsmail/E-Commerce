import { Request, Response } from "express";
import prisma from "../../middleware/prisma";
import { hashPassword } from "../../utils/password";
import { createToken } from "../../utils/jwt";
import { signUpSchema } from "../../utils/validation";

const signUp = async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;
  await signUpSchema.validateAsync(req.body);
  const isExitUser = await prisma.users.findUnique({
    where: { email: email },
  });
  if (isExitUser) {
    return res.status(422).json({ message: "Email is used befor" });
  } else {
    try {
      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.users.create({
        data: {
          email: email,
          username: username,
          password: hashedPassword,
          role: role,
        },
      });
      const resData = {
        status: "success",
        message: "Signed up",
        data: newUser,
      };
      const { id } = newUser;
      const token = await createToken({
        id,
        role,
        username,
      });
      return res
        .status(201)
        .cookie("token", token, { httpOnly: false })
        .json(resData);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default signUp;
