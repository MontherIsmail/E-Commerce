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
const password_1 = require("../../utils/password");
const jwt_1 = require("../../utils/jwt");
const validation_1 = require("../../utils/validation");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, role } = req.body;
    yield validation_1.signUpSchema.validateAsync(req.body);
    const isExitUser = yield prisma_1.default.users.findUnique({
        where: { email: email },
    });
    if (isExitUser) {
        return res.status(422).json({ message: "Email is used befor" });
    }
    else {
        try {
            const hashedPassword = yield (0, password_1.hashPassword)(password);
            const newUser = yield prisma_1.default.users.create({
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
            const token = yield (0, jwt_1.createToken)({
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
});
exports.default = signUp;
