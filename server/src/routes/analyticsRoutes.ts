import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAdmin from "../middleware/checkAdmin";
import getAnalytics from "../controllers/analyticsController/getAnalytics";

const router = Router();

// Get analytics data (admin only)
router.get("/", checkAdmin, asyncMiddleware(getAnalytics));

export default router;
