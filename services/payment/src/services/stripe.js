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

export const retrievePaymentIntent = (id) => handleStripeError(() => stripe.paymentIntents.retrieve(id));

export const transferPayment = (data) => handleStripeError(() => stripe.transfers.create(data));

const handleStripeError = (func) => func().catch((err) => Promise.reject(createError(422, err.raw.message, err)));
