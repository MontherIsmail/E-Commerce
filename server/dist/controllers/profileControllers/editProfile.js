"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../utils/validation");
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const jwt_1 = require("../../utils/jwt");
const editProfile = async (req, res) => {
    const { id } = req.params;
    const { email, username } = req.body;
    await validation_1.editProfileSchema.validateAsync(req.body);
    try {
        const data = await prisma_1.default.users.findUnique({
            where: { id: parseInt(id) },
        });
        if (!data) {
            return res.status(404).json({ message: "No User Found" });
        }
        const { role } = data;
        const emailData = await prisma_1.default.users.findUnique({
            where: { email: email },
        });
        if (!emailData) {
            return res
                .status(422)
                .json({ message: "email already exist, try another one" });
        }
        const updatedProfile = await prisma_1.default.users.update({
            where: { id: parseInt(id) },
            data: {
                email: email,
                username: username,
            },
        });
        const token = await (0, jwt_1.createToken)({
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
};
exports.default = editProfile;
