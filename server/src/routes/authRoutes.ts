import Router from 'express';
import { addUser, getUsers } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.post('/user', asyncMiddleware(addUser));
router.get('/users', asyncMiddleware(getUsers));

export default router;