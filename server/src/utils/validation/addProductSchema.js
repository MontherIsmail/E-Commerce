"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addProductSchema = joi_1.default.object({
    productName: joi_1.default.string().required(),
    productImage: joi_1.default.string().required(),
    productPrice: joi_1.default.number().required(),
    productDescription: joi_1.default.string().required(),
    productCategory: joi_1.default.string().required(),
});
exports.default = addProductSchema;
