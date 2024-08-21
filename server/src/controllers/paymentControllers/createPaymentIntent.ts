import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import prisma from "../../middleware/prisma";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount: floatAmount, userId, products } = req.body;
  const amount = Math.floor(floatAmount);

  try {
    // Check if all products exist
    const existingProducts = await prisma.products.findMany({
      where: {
        id: {
          in: products.map((p: { products: any; id: number }) => p.products.id),
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
    const payment = await prisma.payment.create({
      data: {
        status: paymentIntent.status,
        method: paymentIntent.payment_method_types[0],
        transactionId: paymentIntent.id,
        userId,
      },
    });

    // Create Order with associated OrderItems
    const order = await prisma.order.create({
      data: {
        userId,
        paymentId: payment.id,
        items: {
          create: products.map(
            (product: { products: any; id: number; quantity: number }) => ({
              products: { connect: { id: product.products.id } },
              quantity: product.quantity,
            })
          ),
        },
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      order,
    });
  } catch (error: any) {
    res.status(400).json({
      error: { message: error.message },
    });
  }
};

export default createPaymentIntent;
