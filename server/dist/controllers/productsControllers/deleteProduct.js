"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const productId = parseInt(id);
    try {
        const product = await prisma_1.default.products.findUnique({
            where: { id: productId },
        });
        if (!product) {
            return res.status(404).json({ message: "No Products Found" });
        }
        await prisma_1.default.products.delete({
            where: { id: productId },
        });
        return res.status(200).json({ messgae: "Product Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.default = deleteProduct;
