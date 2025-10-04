import Router from 'express';
import { signUp, getUsers, login, logout, me, createAdmin } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';
import checkAuth from '../middleware/checkAuth';

const router = Router();

router.post('/signup', asyncMiddleware(signUp));
router.post('/login', asyncMiddleware(login));
router.post('/logout', asyncMiddleware(logout));
router.get('/users', asyncMiddleware(getUsers));
router.get('/me', asyncMiddleware(me));
router.post('/create-admin', checkAuth, asyncMiddleware(createAdmin));

export default router;