"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProduct = exports.getProducts = exports.addProduct = void 0;
const addProduct_1 = __importDefault(require("./addProduct"));
exports.addProduct = addProduct_1.default;
const getProducts_1 = __importDefault(require("./getProducts"));
exports.getProducts = getProducts_1.default;
const getProduct_1 = __importDefault(require("./getProduct"));
exports.getProduct = getProduct_1.default;
const deleteProduct_1 = __importDefault(require("./deleteProduct"));
exports.deleteProduct = deleteProduct_1.default;
