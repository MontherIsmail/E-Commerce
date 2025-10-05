"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileControllers_1 = require("../controllers/profileControllers");
const asyncMiddleware_1 = __importDefault(require("../middleware/asyncMiddleware"));
const router = (0, express_1.default)();
router.get("/:id", (0, asyncMiddleware_1.default)(profileControllers_1.getProfile));
router.put("/:id", (0, asyncMiddleware_1.default)(profileControllers_1.editProfile));
router.put("/password/:id", (0, asyncMiddleware_1.default)(profileControllers_1.editPassword));
exports.default = router;
