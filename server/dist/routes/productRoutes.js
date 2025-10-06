"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsControllers_1 = require("../controllers/productsControllers");
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const checkAuth_1 = __importDefault(require("../middleware/checkAuth"));
const checkAdmin_1 = __importDefault(require("../middleware/checkAdmin"));
const requirePermission_1 = __importDefault(require("../middleware/requirePermission"));
const router = (0, express_1.default)();
router.get("/", (0, asyncMiddleware_1.default)(productsControllers_1.getProducts));
router.get("/:id", (0, asyncMiddleware_1.default)(productsControllers_1.getProduct));
// Protected routes - require authentication and admin role
router.use((0, asyncMiddleware_1.default)(checkAuth_1.default));
router.use((0, asyncMiddleware_1.default)(checkAdmin_1.default));
router.post("/add-product", (0, requirePermission_1.default)("manageProducts"), (0, asyncMiddleware_1.default)(productsControllers_1.addProduct));
router.delete("/:id", (0, requirePermission_1.default)("manageProducts"), (0, asyncMiddleware_1.default)(productsControllers_1.deleteProduct));
router.put("/:productId", (0, requirePermission_1.default)("manageProducts"), (0, asyncMiddleware_1.default)(productsControllers_1.editProduct));
exports.default = router;
