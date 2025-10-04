import { Request, Response } from "express";
import prisma from "../../middleware/prisma";
import { hashPassword } from "../../utils/password";

const createAdmin = async (req: Request, res: Response) => {
  const { email, username, password, permissions } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(422).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new admin
    const newAdmin = await prisma.users.create({
      data: {
        email: email,
        username: username || email.split('@')[0],
        password: hashedPassword,
        role: "admin",
        permissions: permissions || {
          manageUsers: true,
          manageProducts: true,
          manageOrders: true,
          viewAnalytics: true,
          manageAdmins: false,
        },
      },
    });

    return res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: newAdmin.id,
        email: newAdmin.email,
        username: newAdmin.username,
        role: newAdmin.role,
        permissions: newAdmin.permissions,
      },
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default createAdmin;

