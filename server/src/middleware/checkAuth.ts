import { Response, Request, NextFunction } from "express";
import * as dotenv from "dotenv";
import { verifyToken } from "../utils/jwt";

dotenv.config();

const checkAuth = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('Request Headers:', req.headers.cookie);
    
    const cookies = req.headers.cookie
      ?.split(";")
      .reduce((acc: any, cookie: any) => {
        const [name, value] = cookie.split("=").map((c: any) => c.trim());
        acc[name] = decodeURIComponent(value);
        return acc;
      }, {});
    const { token } = cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded: any = await verifyToken(token, process.env.PRIVATE_KEY);
    const { id, role } = decoded;
    req.id = id;
    req.role = role;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default checkAuth;
