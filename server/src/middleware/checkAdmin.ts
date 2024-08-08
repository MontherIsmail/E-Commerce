import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { role }: any = req;

  if (role !== "admin") {
    return res.status(401).json({ message: "You Are Not Admin" });
  }
  return next();
};

export default checkAdmin;
