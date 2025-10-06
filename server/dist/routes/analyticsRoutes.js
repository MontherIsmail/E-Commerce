"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const checkAdmin_1 = __importDefault(require("../middleware/checkAdmin"));
const requirePermission_1 = __importDefault(require("../middleware/requirePermission"));
const getAnalytics_1 = __importDefault(require("../controllers/analyticsController/getAnalytics"));
const router = (0, express_1.default)();
// Get analytics data (admin only)
router.get("/", checkAdmin_1.default, (0, requirePermission_1.default)("viewAnalytics"), (0, asyncMiddleware_1.default)(getAnalytics_1.default));
exports.default = router;
