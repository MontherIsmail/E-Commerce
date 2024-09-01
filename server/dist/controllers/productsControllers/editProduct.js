"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const validation_1 = require("../../utils/validation");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, price, description, category, images, productColors, productSizes, stock, } = req.body;
    await validation_1.editProductSchema.validateAsync(req.body);
    try {
        const product = await prisma_1.default.products.findUnique({
            where: { id: parseInt(productId) },
        });
        if (!product) {
            return res.status(404).json({ message: "No Products Found" });
        }
        const productUrlImgs = await Promise.all(images.map(async (image) => {
            const url = await (0, cloudinary_1.default)(image);
            return url;
        }));
        const updatedProduct = await prisma_1.default.products.update({
            where: { id: parseInt(productId) },
            data: {
                productName: name,
                productUrlImgs,
                productDescription: description,
                productPrice: price,
                productCategory: category,
                productColors,
                productSizes,
                stock,
            },
        });
        res
            .status(201)
            .json({ message: "Product updated successfully", updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = editProduct;
