import Router from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} from "../controllers/productsControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAuth from "../middleware/checkAuth";
import checkAdmin from "../middleware/checkAdmin";

const router = Router();

router.get("/", asyncMiddleware(getProducts));
router.get("/:id", asyncMiddleware(getProduct));

// Protected routes - require authentication and admin role
router.use(asyncMiddleware(checkAuth));
router.use(asyncMiddleware(checkAdmin));
router.post("/add-product", asyncMiddleware(addProduct));
router.delete("/:id", asyncMiddleware(deleteProduct));
router.put("/:productId", asyncMiddleware(editProduct));

export default router;
