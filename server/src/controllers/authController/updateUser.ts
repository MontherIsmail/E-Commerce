import { Request, Response } from 'express';
import prisma from '../../middleware/prisma';
import { hashPassword } from '../../utils/password';

// Admin-only: update user fields; requires manageUsers permission (enforced in route)
// Supports updating: email, username, role, permissions, and optionally password
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userIdToUpdate = Number(id);
  if (Number.isNaN(userIdToUpdate)) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  try {
    const existing = await prisma.users.findUnique({ where: { id: userIdToUpdate } });
    if (!existing) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email, username, role, permissions, password } = req.body as {
      email?: string;
      username?: string;
      role?: string;
      permissions?: Record<string, unknown>;
      password?: string;
    };

    const data: any = {};
    if (email !== undefined) data.email = email;
    if (username !== undefined) data.username = username;
    if (role !== undefined) data.role = role;
    if (permissions !== undefined) data.permissions = permissions as any;

    if (password) {
      if (password.length < 6) {
        return res.status(422).json({ message: 'Password must be at least 6 characters' });
      }
      data.password = await hashPassword(password);
    }

    const updated = await prisma.users.update({ where: { id: userIdToUpdate }, data });
    return res.status(200).json({ message: 'User updated successfully', user: { id: updated.id, email: updated.email, username: updated.username, role: updated.role, permissions: updated.permissions } });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default updateUser;


