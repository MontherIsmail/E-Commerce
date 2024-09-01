"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const profileRoutes_1 = __importDefault(require("./profileRoutes"));
const cartRoutes_1 = __importDefault(require("./cartRoutes"));
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const paymentRoute_1 = __importDefault(require("./paymentRoute"));
const ordersRoutes_1 = __importDefault(require("./ordersRoutes"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Monther Alzamli");
});
router.use("/auth", authRoutes_1.default);
router.use("/payment", paymentRoute_1.default);
router.use("/products", productRoutes_1.default);
router.use((0, asyncMiddleware_1.default)(checkAuth_1.default));
router.use("/profile", profileRoutes_1.default);
router.use("/cart", cartRoutes_1.default);
router.use("/orders", ordersRoutes_1.default);
exports.default = router;
