import { Router } from "express";
import authRouter from "./authRoutes";
import productRoutes from "./productRoutes";

const router = Router();

router.get('/', (req, res) => {
    res.send('Monther Alzamli')
});

router.use('/auth', authRouter);
router.use('/products', productRoutes);


export default router;