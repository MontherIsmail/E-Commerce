import Router from "express";
import createPaymentIntent from "../controllers/paymentControllers";
import asyncMiddleware from "../middleware/asyncMiddleware";

const router = Router();

router.post("/create-payment-intent", asyncMiddleware(createPaymentIntent));

export default router;
