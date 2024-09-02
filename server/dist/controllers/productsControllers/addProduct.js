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
    const { productName, productImages, productPrice, productDescription, productCategory, productColors, productSizes, stock, } = req.body;
    yield validation_1.addProductSchema.validateAsync(req.body);
    const productUrlImgs = yield Promise.all(productImages.map((productImage) => __awaiter(void 0, void 0, void 0, function* () {
        const url = yield (0, cloudinary_1.default)(productImage);
        return url;
    })));
    try {
        const newProduct = yield prisma_1.default.products.create({
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
});
exports.default = addProduct;
