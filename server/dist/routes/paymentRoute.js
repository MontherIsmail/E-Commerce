"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentControllers_1 = __importDefault(require("../controllers/paymentControllers"));
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const router = (0, express_1.default)();
router.post("/create-payment-intent", (0, asyncMiddleware_1.default)(paymentControllers_1.default));
exports.default = router;
