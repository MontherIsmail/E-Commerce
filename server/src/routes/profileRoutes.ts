import Router from "express";
import { getProfile } from "../controllers/profileControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";

const router = Router();

router.get("/:id", asyncMiddleware(getProfile));

export default router;
