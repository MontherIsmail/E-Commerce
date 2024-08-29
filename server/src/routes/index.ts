import { Router } from "express";
import authRouter from "./authRoutes";
import productRoutes from "./productRoutes";
import profileRoutes from "./profileRoutes";
import cartRoutes from "./cartRoutes";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAuth from "../middleware/checkAuth";
import paymentRoutes from "./paymentRoute";
import ordersRoutes from "./ordersRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Monther Alzamli");
});

router.use("/auth", authRouter);
router.use("/payment", paymentRoutes);
router.use("/products", productRoutes);
router.use(asyncMiddleware(checkAuth));
router.use("/profile", profileRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", ordersRoutes);

export default router;
