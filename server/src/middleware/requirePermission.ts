import { Request, Response, NextFunction } from "express";
import prisma from "./prisma";

type PermissionKey =
  | "manageUsers"
  | "manageProducts"
  | "manageOrders"
  | "viewAnalytics"
  | "manageAdmins";

export const requirePermission = (permission: PermissionKey) => {
  return async (req: Request & { id?: number }, res: Response, next: NextFunction) => {
    try {
      if (!req.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await prisma.users.findUnique({
        where: { id: req.id },
        select: { role: true, permissions: true },
      });

      if (!user || user.role !== "admin") {
        return res.status(401).json({ message: "You Are Not Admin" });
      }

      const perms = (user.permissions as Record<string, boolean>) || {};
      if (!perms[permission]) {
        return res.status(403).json({ message: "Forbidden" });
      }

      return next();
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default requirePermission;


