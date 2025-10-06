import Router from "express";
import asyncMiddleware from "../middleware/asyncMiddleware";
import checkAdmin from "../middleware/checkAdmin";
import requirePermission from "../middleware/requirePermission";
import getAnalytics from "../controllers/analyticsController/getAnalytics";

const router = Router();

// Get analytics data (admin only)
router.get("/", checkAdmin, requirePermission("viewAnalytics"), asyncMiddleware(getAnalytics));

export default router;
