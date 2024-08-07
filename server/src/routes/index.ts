import { Router } from "express";
import authRouter from "./authRoutes";
import productRoutes from "./productRoutes";
import profileRoutes from "./profileRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Monther Alzamli");
});

router.use("/auth", authRouter);
router.use("/products", productRoutes);
router.use("/profile", profileRoutes);

export default router;
