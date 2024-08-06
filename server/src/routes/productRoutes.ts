import Router from 'express';
import { addProduct, getProducts } from "../controllers/productsControllers";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.get('/', asyncMiddleware(getProducts));
router.post('/add-product', asyncMiddleware(addProduct));


export default router;