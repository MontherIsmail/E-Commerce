"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const getProducts = async (req, res) => {
    try {
        const products = await prisma_1.default.products.findMany();
        if (products.length === 0) {
            return res.status(404).json({ message: "No Products Found" });
        }
        return res.status(200).json({ messgae: "successfully", products });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = getProducts;
