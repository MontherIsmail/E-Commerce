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
const jwt_1 = require("../../utils/jwt");
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, username } = req.body;
    yield validation_1.editProfileSchema.validateAsync(req.body);
    try {
        const data = yield prisma_1.default.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) {
            return res.status(404).json({ message: "No User Found" });
        }
        const { role } = data;
        const emailData = yield prisma_1.default.users.findUnique({
            where: { email: email },
        });
        if (!emailData) {
            return res
                .status(422)
                .json({ message: "email already exist, try another one" });
        }
        const updatedProfile = yield prisma_1.default.users.update({
            where: { id: parseInt(id) },
            data: {
                email: email,
                username: username,
            },
        });
        const token = yield (0, jwt_1.createToken)({
            id,
            role,
            username,
        });
        return res
            .status(201)
            .cookie("token", token, {
            httpOnly: false,
        })
            .json({ message: "Profile edited Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.default = editProfile;
