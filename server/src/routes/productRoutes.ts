import Router from 'express';
import { addProduct } from "../controllers/productsControllers";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.post('/add-product', asyncMiddleware(addProduct));


export default router;