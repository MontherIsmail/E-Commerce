import { Request, Response } from 'express';
import prisma from '../../middleware/prisma';

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userIdToDelete = Number(id);
  if (Number.isNaN(userIdToDelete)) {
    return res.status(400).json({ message: 'Invalid user id' });
  }

  // Prevent self-deletion on the server as a safety check
  // checkAuth middleware should have populated req.user
  const currentUserId = (req as any)?.user?.id;
  if (currentUserId && Number(currentUserId) === userIdToDelete) {
    return res.status(400).json({ message: 'You cannot delete your own admin account.' });
  }

  try {
    // Only delete if user exists
    const existing = await prisma.users.findUnique({ where: { id: userIdToDelete } });
    if (!existing) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Perform delete. If there are foreign key constraints, the DB/prisma schema should enforce behavior.
    await prisma.users.delete({ where: { id: userIdToDelete } });
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default deleteUser;


