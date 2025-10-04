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
      const { id } = newUser;
      const token = await createToken({
        id,
        role,
        username,
      });
      
      const isProduction = process.env.NODE_ENV === 'production';
      
      return res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? "none" : "lax",
          maxAge: 1000 * 60 * 60 * 24,
          path: '/',
        })
        .json({ message: "Signed up", user: { id, username, role } });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default signUp;
