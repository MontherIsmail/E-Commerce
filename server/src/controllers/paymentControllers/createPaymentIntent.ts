import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import prisma from "../../middleware/prisma";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount, userId, products } = req.body;

  try {
    // Check if all products exist
    const existingProducts = await prisma.products.findMany({
      where: {
        id: { in: products.map((p: { id: number }) => p.id) },
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
          create: products.map((product: { id: number; quantity: number }) => ({
            products: { connect: { id: product.id } },
            quantity: product.quantity,
          })),
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

// import { Request, Response } from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";
// import prisma from "../../middleware/prisma";

// dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

// const createPaymentIntent = async (req: Request, res: Response) => {
//   const { amount, userId, products } = req.body;
//   console.log("monther from backend", amount, userId, products);

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     });

//     const { id, status, payment_method_types }: any = paymentIntent;
//     console.log("hereeeeeeeeeeeeeeeeee", id, status, payment_method_types[0], userId);

//     const payment = await prisma.payment.create({
//       data: {
//         status: status,
//         method: payment_method_types[0],
//         transactionId: id,
//         userId: userId,
//         orderId: 1
//       },
//     });
//     console.log("here 3333333333333");

//     const order = await prisma.order.create({
//       data: {
//         userId,
//         paymentId: payment.id, // Link order to payment
//         items: {
//           create: products.map((product: { id: any; quantity: any }) => ({
//             product: { connect: { id: product.id } }, // Link each product to the order
//             quantity: product.quantity,
//           })),
//         },
//       },
//       include: {
//         payment: true,
//         items: {
//           include: {
//             products: true,
//           },
//         },
//       },
//     });

//     console.log("here 444444444444444");

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//       // order,
//     });
//   } catch (error: any) {
//     res.status(400).send({
//       error: { message: error.message },
//     });
//   }
// };

// export default createPaymentIntent;
