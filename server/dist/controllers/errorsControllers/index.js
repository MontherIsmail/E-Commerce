"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.clientError = void 0;
const clientError_1 = __importDefault(require("./clientError"));
exports.clientError = clientError_1.default;
const serverError_1 = __importDefault(require("./serverError"));
exports.serverError = serverError_1.default;
