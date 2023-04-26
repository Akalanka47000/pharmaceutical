import initialize from 'stripe';
import createError from 'http-errors';
import config from '../config';

const stripe = initialize(config.STRIPE_SECRET_KEY);

export const createPaymentIntent = (data) =>
  handleStripeError(() =>
    stripe.paymentIntents.create({
      ...data,
      payment_method_types: ['card'],
    }),
  );

const handleStripeError = (func) => func().catch((err) => Promise.reject(createError(422, err.raw.message, err)));
