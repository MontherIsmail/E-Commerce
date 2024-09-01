"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await prisma_1.default.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) {
            return res.status(404).json({ message: "No User Found" });
        }
        const cartItems = await prisma_1.default.cart.findMany({
            where: { userId: parseInt(id) },
            include: { products: true },
        });
        res.status(200).json({ message: "Successfully", cartItems });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = getCart;
