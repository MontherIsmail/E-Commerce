import Router from 'express';
import { signUp, getUsers, login, logout, me, createAdmin, deleteUser } from "../controllers/authController";
import asyncMiddleware from '../middleware/asyncMiddleware';
import checkAuth from '../middleware/checkAuth';
import checkAdmin from '../middleware/checkAdmin';
import requirePermission from '../middleware/requirePermission';

const router = Router();

router.post('/signup', asyncMiddleware(signUp));
router.post('/login', asyncMiddleware(login));
router.post('/logout', asyncMiddleware(logout));
// Restrict listing users/admins to admins with manageAdmins permission
router.get('/users', checkAuth, checkAdmin, requirePermission('manageAdmins'), asyncMiddleware(getUsers));
router.get('/me', asyncMiddleware(me));
router.post('/create-admin', checkAuth, requirePermission('manageAdmins'), asyncMiddleware(createAdmin));
router.delete('/users/:id', checkAuth, checkAdmin, requirePermission('manageAdmins'), asyncMiddleware(deleteUser));

export default router;