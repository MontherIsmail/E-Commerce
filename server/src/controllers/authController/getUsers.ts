import { Request, Response } from 'express';
import prisma from '../../middleware/prisma';

const getUsers = async (req: Request, res:Response) => {
  try{
    const users = await prisma.users.findMany();
    res.json(users);  
  }catch(error){
    res.status(500).json({error: 'Internal Server Error'})
  }
}

export default getUsers;