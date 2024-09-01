"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../middleware/prisma"));
const getOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const isExitingUser = await prisma_1.default.users.findUnique({
            where: { id: parseInt(userId) },
        });
        if (!isExitingUser) {
            return res.status(404).json({ message: "User Dose Not Found!" });
        }
        // const orders = await prisma.order.findMany({
        //   where: {userId : parseInt(userId)}
        // });
        const orders = await prisma_1.default.order.findMany({
            where: {
                userId: parseInt(userId),
            },
            include: {
                items: {
                    include: {
                        products: true,
                    },
                },
                payment: true,
            },
        });
        if (orders.length === 0) {
            return res.status(404).json({ message: "No Orders Found" });
        }
        return res.status(200).json({ messgae: "successfully", orders });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = getOrders;
