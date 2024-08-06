import Router from 'express';
import { addProduct, getProducts, getProduct } from "../controllers/productsControllers";
import asyncMiddleware from '../middleware/asyncMiddleware';

const router = Router();

router.get('/', asyncMiddleware(getProducts));
router.get('/:id', asyncMiddleware(getProduct));
router.post('/add-product', asyncMiddleware(addProduct));


export default router;