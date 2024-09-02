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
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, userId, quantity, selectedColor, selectedSize } = req.body;
    try {
        const isExitingUser = yield prisma_1.default.users.findUnique({
            where: { id: userId },
        });
        if (!isExitingUser) {
            return res.status(404).json({ message: "User Dose Not Exit!" });
        }
        const isExitingProduct = yield prisma_1.default.products.findUnique({
            where: { id: parseInt(productId) },
        });
        if (!isExitingProduct) {
            return res.status(404).json({ message: "Product Dose Not Exit!" });
        }
        const cartItem = yield prisma_1.default.cart.upsert({
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
});
exports.default = addToCart;
