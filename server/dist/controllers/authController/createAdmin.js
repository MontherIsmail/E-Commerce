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
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const password_1 = require("../../utils/password");
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, permissions } = req.body;
    // Validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        // Check if user already exists
        const existingUser = yield prisma_1.default.users.findUnique({
            where: { email: email },
        });
        if (existingUser) {
            return res.status(422).json({ message: "Email already exists" });
        }
        // Hash the password
        const hashedPassword = yield (0, password_1.hashPassword)(password);
        // Create new admin
        const newAdmin = yield prisma_1.default.users.create({
            data: {
                email: email,
                username: username || email.split('@')[0],
                password: hashedPassword,
                role: "admin",
                permissions: permissions || {
                    manageUsers: true,
                    manageProducts: true,
                    manageOrders: true,
                    viewAnalytics: true,
                    manageAdmins: false,
                },
            },
        });
        return res.status(201).json({
            message: "Admin created successfully",
            admin: {
                id: newAdmin.id,
                email: newAdmin.email,
                username: newAdmin.username,
                role: newAdmin.role,
                permissions: newAdmin.permissions,
            },
        });
    }
    catch (error) {
        console.error("Error creating admin:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.default = createAdmin;
