import Router from 'express';
import { signUp, getUsers } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.post('/signup', asyncMiddleware(signUp));
router.get('/users', asyncMiddleware(getUsers));

export default router;