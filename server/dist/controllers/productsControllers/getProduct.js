"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma_1.default.products.findUnique({
            where: { id: parseInt(id) }
        });
        if (!product) {
            return res.status(404).json({ message: "No Products Found" });
        }
        return res.status(200).json({ messgae: "successfully", product });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = getProduct;
