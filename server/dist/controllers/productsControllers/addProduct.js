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
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, productImages, productPrice, productDescription, productCategory, productColors, productSizes, stock, } = req.body;
        // Validate request body
        yield validation_1.addProductSchema.validateAsync(req.body);
        // Process images - if already a URL, use it; otherwise upload to Cloudinary
        const productUrlImgs = yield Promise.all(productImages.map((productImage) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Check if it's already a valid URL
                if (productImage.startsWith('http://') || productImage.startsWith('https://')) {
                    return productImage;
                }
                // Otherwise, try to upload to Cloudinary
                const url = yield (0, cloudinary_1.default)(productImage);
                return url;
            }
            catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                // If Cloudinary fails, check if it's a URL and use it anyway
                if (productImage.startsWith('http://') || productImage.startsWith('https://')) {
                    return productImage;
                }
                // If not a URL, throw error
                throw new Error('Invalid image: must be a URL or valid image file');
            }
        })));
        const newProduct = yield prisma_1.default.products.create({
            data: {
                productName,
                productUrlImgs,
                productPrice: parseFloat(productPrice),
                productDescription,
                productCategory,
                productColors,
                productSizes,
                stock: parseInt(stock),
            },
        });
        return res
            .status(201)
            .json({ message: "Product Added Successfully", newProduct });
    }
    catch (error) {
        console.error('Add product error:', error);
        // Handle validation errors
        if (error.isJoi) {
            return res.status(400).json({
                message: "Validation Error",
                details: error.details
            });
        }
        // Handle other errors
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message || error
        });
    }
});
exports.default = addProduct;
