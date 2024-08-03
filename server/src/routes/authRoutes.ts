import Router from 'express';
import { signUp, getUsers, login, logout } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.post('/signup', asyncMiddleware(signUp));
router.post('/login', asyncMiddleware(login));
router.post('/logout', asyncMiddleware(logout));
router.get('/users', asyncMiddleware(getUsers));

export default router;