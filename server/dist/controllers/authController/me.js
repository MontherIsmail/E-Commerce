"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../utils/jwt");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const privateKey = process.env.PRIVATE_KEY;
        const payload = yield (0, jwt_1.verifyToken)(token, privateKey);
        const { id } = payload || {};
        if (!id) {
            return res.status(401).json({ message: "Invalid token" });
        }
        // Fetch full user data from database
        const user = yield prisma_1.default.users.findUnique({
            where: { id: id },
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                permissions: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
});
exports.default = me;
