"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsControllers_1 = require("../controllers/productsControllers");
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const router = (0, express_1.default)();
router.get('/', (0, asyncMiddleware_1.default)(productsControllers_1.getProducts));
router.get('/:id', (0, asyncMiddleware_1.default)(productsControllers_1.getProduct));
router.post('/add-product', (0, asyncMiddleware_1.default)(productsControllers_1.addProduct));
router.delete('/:id', (0, asyncMiddleware_1.default)(productsControllers_1.deleteProduct));
exports.default = router;
