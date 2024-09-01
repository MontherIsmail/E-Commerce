"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../utils/validation");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const password_1 = require("../../utils/password");
const editPassword = async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    await validation_1.editPassSchema.validateAsync(req.body);
    try {
        const currentProfileData = await prisma_1.default.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!currentProfileData) {
            return res.status(404).json({ message: "user not found" });
        }
        if (currentPassword === newPassword) {
            return res
                .status(400)
                .json({ message: "your new password matching your old password" });
        }
        const { password } = currentProfileData;
        const isMatch = await (0, password_1.comparePassword)(currentPassword, password);
        if (!isMatch) {
            return res.status(400).json({ message: "wrong password !" });
        }
        const hashedNewPassword = await (0, password_1.hashPassword)(newPassword);
        await prisma_1.default.users.update({
            where: { id: parseInt(id) },
            data: {
                password: hashedNewPassword,
            },
        });
        return res.status(200).json({ message: "password edited" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.default = editPassword;
