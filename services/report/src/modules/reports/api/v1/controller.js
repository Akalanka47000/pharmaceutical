import express from 'express';
import { toSuccess } from '@app/middleware';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { serviceGenerateOrderReport } from './service';

const reports = express.Router();

reports.get(
  '/orders',
  tracedAsyncHandler(async function controllerGenerateOrderReport(_req, res) {
    const data = await traced(serviceGenerateOrderReport)();
    return toSuccess({ res, data, message: 'Order report generated successfully!' });
  }),
);

export default reports;
