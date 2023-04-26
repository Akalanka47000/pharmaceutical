import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';
import { serviceInitializePayment } from './service';
import { initializePaymentSchema } from './schema';

const payment = express.Router();

payment.post(
  '/',
  celebrate({ [Segments.BODY]: initializePaymentSchema }),
  tracedAsyncHandler(async function controllerInitiatePayments(req, res) {
    const data = await traced(serviceInitializePayment)(req.body, req.headers['x-user-id']);
    return toSuccess({ status: 201, res, message: 'Payment initialized', data });
  }),
);

export default payment;
