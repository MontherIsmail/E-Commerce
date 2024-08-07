import Router from "express";
import { getProfile, editProfile, editPassword } from "../controllers/profileControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";

const router = Router();

router.get("/:id", asyncMiddleware(getProfile));
router.put("/:id", asyncMiddleware(editProfile));
router.put("/password/:id", asyncMiddleware(editPassword));

export default router;
