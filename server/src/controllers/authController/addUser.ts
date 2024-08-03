import { Request, Response } from 'express';
import prisma from '../../middleware/prisma';

const getUsers = async (req: Request, res:Response) => {
    const { email, name } = req.body;
    console.log('monther', req.body, email, name);
    try {
      const newUser = await prisma.user.create({
        data: { email, name },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error'});
    }
}

export default getUsers;