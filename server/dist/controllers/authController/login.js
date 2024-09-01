"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../utils/validation");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const login = async (req, res) => {
    const { email, password } = req.body;
    await validation_1.loginSchema.validateAsync(req.body);
    try {
        const isExitUser = await prisma_1.default.users.findUnique({
            where: { email: email },
        });
        if (!isExitUser) {
            return res.status(404).json({ message: "Email Dose Not Found!" });
        }
        const hashedPassword = isExitUser.password;
        const { id, username, role } = isExitUser;
        const isMatch = await (0, password_1.comparePassword)(password, hashedPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Email Or Password Wrong!" });
        }
        const token = await (0, jwt_1.createToken)({
            id,
            role,
            username,
        });
        return res
            .status(201)
            .cookie("token", token, {
            httpOnly: false,
        })
            .json({ message: "login successfully", token });
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
};
exports.default = login;
