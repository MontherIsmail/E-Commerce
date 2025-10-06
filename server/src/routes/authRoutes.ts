import Router from 'express';
import { signUp, getUsers, login, logout, me, createAdmin } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';
import checkAuth from '../middleware/checkAuth';
import requirePermission from '../middleware/requirePermission';

const router = Router();

router.post('/signup', asyncMiddleware(signUp));
router.post('/login', asyncMiddleware(login));
router.post('/logout', asyncMiddleware(logout));
router.get('/users', asyncMiddleware(getUsers));
router.get('/me', asyncMiddleware(me));
router.post('/create-admin', checkAuth, requirePermission('manageAdmins'), asyncMiddleware(createAdmin));

export default router;