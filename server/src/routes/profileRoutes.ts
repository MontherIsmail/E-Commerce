import Router from "express";
import { getProfile, editProfile } from "../controllers/profileControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";

const router = Router();

router.get("/:id", asyncMiddleware(getProfile));
router.put("/:id", asyncMiddleware(editProfile));

export default router;
