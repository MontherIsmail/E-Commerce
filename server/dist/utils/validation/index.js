"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPassSchema = exports.editProfileSchema = exports.editProductSchema = exports.addProductSchema = exports.loginSchema = exports.signUpSchema = void 0;
const addProductSchema_1 = __importDefault(require("./addProductSchema"));
exports.addProductSchema = addProductSchema_1.default;
const editPassSchema_1 = __importDefault(require("./editPassSchema"));
exports.editPassSchema = editPassSchema_1.default;
const editProductValidation_1 = __importDefault(require("./editProductValidation"));
exports.editProductSchema = editProductValidation_1.default;
const editProfileSchema_1 = __importDefault(require("./editProfileSchema"));
exports.editProfileSchema = editProfileSchema_1.default;
const loginSchema_1 = __importDefault(require("./loginSchema"));
exports.loginSchema = loginSchema_1.default;
const signUpSchema_1 = __importDefault(require("./signUpSchema"));
exports.signUpSchema = signUpSchema_1.default;
