import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import { addToCart } from "../controllers/cartControllers";

const router = Router();

router.post("/add-to-cart", asyncMiddleware(addToCart));

export default router;
