import Router from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} from "../controllers/productsControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAdmin from "../middleware/checkAdmin";

const router = Router();

router.get("/", asyncMiddleware(getProducts));
router.get("/:id", asyncMiddleware(getProduct));
// router.use(asyncMiddleware(checkAdmin));
router.post("/add-product", asyncMiddleware(addProduct));
router.delete("/:id", asyncMiddleware(deleteProduct));
router.put("/:productId", asyncMiddleware(editProduct));

export default router;
