"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const cartControllers_1 = require("../controllers/cartControllers");
const router = (0, express_1.default)();
router.post("/add-to-cart", (0, asyncMiddleware_1.default)(cartControllers_1.addToCart));
router.get("/:id", (0, asyncMiddleware_1.default)(cartControllers_1.getCart));
router.delete("/:id", (0, asyncMiddleware_1.default)(cartControllers_1.deleteCartItem));
router.delete("/reset/:userId", (0, asyncMiddleware_1.default)(cartControllers_1.resetCart));
exports.default = router;
