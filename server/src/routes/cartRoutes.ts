import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import { addToCart, getCart, deleteCartItem } from "../controllers/cartControllers";

const router = Router();

router.post("/add-to-cart", asyncMiddleware(addToCart));
router.get("/:id", asyncMiddleware(getCart));
router.delete("/:id", asyncMiddleware(deleteCartItem));

export default router;
