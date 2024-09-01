"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const validation_1 = require("../../utils/validation");
const signUp = async (req, res) => {
    const { email, username, password, role } = req.body;
    await validation_1.signUpSchema.validateAsync(req.body);
    const isExitUser = await prisma_1.default.users.findUnique({
        where: { email: email },
    });
    if (isExitUser) {
        return res.status(422).json({ message: "Email is used befor" });
    }
    else {
        try {
            const hashedPassword = await (0, password_1.hashPassword)(password);
            const newUser = await prisma_1.default.users.create({
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                    role: role,
                },
            });
            const resData = {
                status: "success",
                message: "Signed up",
                data: newUser,
            };
            const { id } = newUser;
            const token = await (0, jwt_1.createToken)({
                id,
                role,
                username,
            });
            return res
                .status(201)
                .cookie("token", token, { httpOnly: false })
                .json(resData);
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.default = signUp;
