"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("../../middleware/prisma"));
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "");
const createPaymentIntent = async (req, res) => {
    const { amount: floatAmount, userId, products } = req.body;
    const amount = Math.floor(floatAmount);
    try {
        // Check if all products exist
        const existingProducts = await prisma_1.default.products.findMany({
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
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        // Create Payment record
        const payment = await prisma_1.default.payment.create({
            data: {
                status: paymentIntent.status,
                method: paymentIntent.payment_method_types[0],
                transactionId: paymentIntent.id,
                userId,
            },
        });
        // Create Order with associated OrderItems
        const order = await prisma_1.default.order.create({
            data: {
                userId,
                paymentId: payment.id,
                amount,
                items: {
                    create: products?.map((product) => ({
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
};
exports.default = createPaymentIntent;
