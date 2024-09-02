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
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("../../middleware/prisma"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "");
const createPaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount: floatAmount, userId, products } = req.body;
    const amount = Math.floor(floatAmount);
    try {
        // Check if all products exist
        const existingProducts = yield prisma_1.default.products.findMany({
            where: {
                id: {
                    in: products.map((p) => p.products.id),
                },
            },
        });
        if (existingProducts.length !== products.length) {
            console.log("The products in the order not existing");
            return res.status(400).json({
                message: "Some products in the order do not exist.",
            });
        }
        // Create Stripe PaymentIntent
        const paymentIntent = yield stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        // Create Payment record
        const payment = yield prisma_1.default.payment.create({
            data: {
                status: paymentIntent.status,
                method: paymentIntent.payment_method_types[0],
                transactionId: paymentIntent.id,
                userId,
            },
        });
        // Create Order with associated OrderItems
        const order = yield prisma_1.default.order.create({
            data: {
                userId,
                paymentId: payment.id,
                amount,
                items: {
                    create: products === null || products === void 0 ? void 0 : products.map((product) => ({
                        products: { connect: { id: product.products.id } },
                        quantity: product.quantity,
                    })),
                },
            },
        });
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            order,
        });
    }
    catch (error) {
        console.log('error', error);
        // res.status(400).json({
        //   error: { message: error.message },
        // });
    }
});
exports.default = createPaymentIntent;
