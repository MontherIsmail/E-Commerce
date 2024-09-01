"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const resetCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await prisma_1.default.users.findUnique({
            where: { id: parseInt(userId) },
        });
        if (!data) {
            return res.status(404).json({ message: "No User Found" });
        }
        await prisma_1.default.cart.deleteMany({
            where: {
                userId: parseInt(userId),
            },
        });
        return res.status(200).json({ messgae: "Successfully, Cart now empty" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.default = resetCart;
