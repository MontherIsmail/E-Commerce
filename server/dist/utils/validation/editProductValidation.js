"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const editProductSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    images: joi_1.default.array().required(),
    price: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    productColors: joi_1.default.array().required(),
    productSizes: joi_1.default.array().required(),
    stock: joi_1.default.number().required(),
});
exports.default = editProductSchema;
