"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const router = (0, express_1.default)();
router.post('/signup', (0, asyncMiddleware_1.default)(authController_1.signUp));
router.post('/login', (0, asyncMiddleware_1.default)(authController_1.login));
router.post('/logout', (0, asyncMiddleware_1.default)(authController_1.logout));
router.get('/users', (0, asyncMiddleware_1.default)(authController_1.getUsers));
exports.default = router;
