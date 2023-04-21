import express from 'express';
import stripe from 'stripe';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';

const payment = express.Router();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

payment.post(
  '/',
  tracedAsyncHandler(async function controllerInitiatePayments(req, res) {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: 100000,
      currency: 'lkr',
      payment_method: 'pm_card_visa',
    });

    const data = { client_secret: paymentIntent.client_secret };
    return toSuccess({ status: 201, res, message: 'Payment initialized', data });
  }),
);

export default payment;
