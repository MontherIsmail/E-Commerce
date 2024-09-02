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
const validation_1 = require("../../utils/validation");
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const { name, price, description, category, images, productColors, productSizes, stock, } = req.body;
    yield validation_1.editProductSchema.validateAsync(req.body);
    try {
        const product = yield prisma_1.default.products.findUnique({
            where: { id: parseInt(productId) },
        });
        if (!product) {
            return res.status(404).json({ message: "No Products Found" });
        }
        const productUrlImgs = yield Promise.all(images.map((image) => __awaiter(void 0, void 0, void 0, function* () {
            const url = yield (0, cloudinary_1.default)(image);
            return url;
        })));
        const updatedProduct = yield prisma_1.default.products.update({
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
});
exports.default = editProduct;
