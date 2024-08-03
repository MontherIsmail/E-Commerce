import { Router } from "express";
import authRouter from "./authRoutes";

const router = Router();

router.get('/', (req, res) => {
    res.send('Monther Alzamli')
});

router.use('/auth', authRouter);


export default router;