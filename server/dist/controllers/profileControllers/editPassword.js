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
const validation_1 = require("../../utils/validation");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const password_1 = require("../../utils/password");
const editPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    yield validation_1.editPassSchema.validateAsync(req.body);
    try {
        const currentProfileData = yield prisma_1.default.users.findUnique({
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
        const isMatch = yield (0, password_1.comparePassword)(currentPassword, password);
        if (!isMatch) {
            return res.status(400).json({ message: "wrong password !" });
        }
        const hashedNewPassword = yield (0, password_1.hashPassword)(newPassword);
        yield prisma_1.default.users.update({
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
});
exports.default = editPassword;
