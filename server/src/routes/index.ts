import { Router } from "express";
import authRouter from "./authRoutes";
import productRoutes from "./productRoutes";
import profileRoutes from "./profileRoutes";
import cartRoutes from "./cartRoutes";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.get("/", (req, res) => {
  res.send("Monther Alzamli");
});

router.use("/auth", authRouter);
router.use(asyncMiddleware(checkAuth));
router.use("/products", productRoutes);
router.use("/profile", profileRoutes);
router.use("/cart", cartRoutes);

export default router;
