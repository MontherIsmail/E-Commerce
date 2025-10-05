import { Request, Response } from "express";
import { loginSchema } from "../../utils/validation";
import prisma from "../../middleware/prisma";
import { comparePassword } from "../../utils/password";
import { createToken } from "../../utils/jwt";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await loginSchema.validateAsync(req.body);
  try {
    const isExitUser = await prisma.users.findUnique({
      where: { email: email },
    });
    if (!isExitUser) {
      return res.status(404).json({ message: "Email Dose Not Found!" });
    }
    const hashedPassword = isExitUser.password;
    const { id, username, role } = isExitUser;
    const isMatch = await comparePassword(password, hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Email Or Password Wrong!" });
    }
    const token = await createToken({
      id,
      role,
      username,
    });

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure in production
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax", // Only none in production
        maxAge: 1000 * 60 * 60 * 24,
        // Ensure cookie is sent on all subpaths (host-only cookie)
        path: '/',
      })
      .json({ 
        message: "login successfully",
        user: { id, username, role }
      });
    return res;
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export default login;
