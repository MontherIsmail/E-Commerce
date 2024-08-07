import { Router } from "express";
import authRouter from "./authRoutes";
import productRoutes from "./productRoutes";
import profileRoutes from "./profileRoutes";
import cartRoutes from "./cartRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Monther Alzamli");
});

router.use("/auth", authRouter);
router.use("/products", productRoutes);
router.use("/profile", profileRoutes);
router.use("/cart", cartRoutes);

export default router;
