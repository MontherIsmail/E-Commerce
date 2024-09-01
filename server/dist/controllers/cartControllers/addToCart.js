"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const addToCart = async (req, res) => {
    const { productId, userId, quantity, selectedColor, selectedSize } = req.body;
    try {
        const isExitingUser = await prisma_1.default.users.findUnique({
            where: { id: userId },
        });
        if (!isExitingUser) {
            return res.status(404).json({ message: "User Dose Not Exit!" });
        }
        const isExitingProduct = await prisma_1.default.products.findUnique({
            where: { id: parseInt(productId) },
        });
        if (!isExitingProduct) {
            return res.status(404).json({ message: "Product Dose Not Exit!" });
        }
        const cartItem = await prisma_1.default.cart.upsert({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: parseInt(productId),
                },
            },
            update: {
                quantity: { increment: quantity },
                color: selectedColor,
                size: selectedSize,
            },
            create: {
                userId: userId,
                productId: parseInt(productId),
                quantity: quantity,
                color: selectedColor,
                size: selectedSize,
            },
        });
        return res.json(cartItem);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.default = addToCart;
