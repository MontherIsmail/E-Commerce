"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsControllers_1 = require("../controllers/productsControllers");
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const checkAdmin_1 = __importDefault(require("../middleware/checkAdmin"));
const router = (0, express_1.default)();
router.get("/", (0, asyncMiddleware_1.default)(productsControllers_1.getProducts));
router.get("/:id", (0, asyncMiddleware_1.default)(productsControllers_1.getProduct));
router.use((0, asyncMiddleware_1.default)(checkAdmin_1.default));
router.post("/add-product", (0, asyncMiddleware_1.default)(productsControllers_1.addProduct));
router.delete("/:id", (0, asyncMiddleware_1.default)(productsControllers_1.deleteProduct));
router.put("/:productId", (0, asyncMiddleware_1.default)(productsControllers_1.editProduct));
exports.default = router;
