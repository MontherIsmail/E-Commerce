"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../utils/validation");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const addProduct = async (req, res) => {
    const { productName, productImages, productPrice, productDescription, productCategory, productColors, productSizes, stock, } = req.body;
    await validation_1.addProductSchema.validateAsync(req.body);
    const productUrlImgs = await Promise.all(productImages.map(async (productImage) => {
        const url = await (0, cloudinary_1.default)(productImage);
        return url;
    }));
    try {
        const newProduct = await prisma_1.default.products.create({
            data: {
                productName,
                productUrlImgs,
                productPrice,
                productDescription,
                productCategory,
                productColors,
                productSizes,
                stock,
            },
        });
        return res
            .status(201)
            .json({ message: "Product Added Successfully", newProduct });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.default = addProduct;
