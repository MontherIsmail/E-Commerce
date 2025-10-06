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
exports.requirePermission = void 0;
const prisma_1 = __importDefault(require("./prisma"));
const requirePermission = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.id) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const user = yield prisma_1.default.users.findUnique({
                where: { id: req.id },
                select: { role: true, permissions: true },
            });
            if (!user || user.role !== "admin") {
                return res.status(401).json({ message: "You Are Not Admin" });
            }
            const perms = user.permissions || {};
            if (!perms[permission]) {
                return res.status(403).json({ message: "Forbidden" });
            }
            return next();
        }
        catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
};
exports.requirePermission = requirePermission;
exports.default = exports.requirePermission;
