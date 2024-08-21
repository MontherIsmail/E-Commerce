import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import { getOrders } from "../controllers/ordersControllars";

const router = Router();

router.get("/:userId", asyncMiddleware(getOrders));

export default router;
