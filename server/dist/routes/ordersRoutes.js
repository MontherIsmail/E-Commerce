"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const ordersControllars_1 = require("../controllers/ordersControllars");
const router = (0, express_1.default)();
router.get("/:userId", (0, asyncMiddleware_1.default)(ordersControllars_1.getOrders));
exports.default = router;
