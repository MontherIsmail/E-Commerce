import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import { addToCart, getCart } from "../controllers/cartControllers";

const router = Router();

router.post("/add-to-cart", asyncMiddleware(addToCart));
router.get("/:id", asyncMiddleware(getCart));

export default router;
