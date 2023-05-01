import express from 'express';
import { toSuccess } from '@app/middleware';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { serviceGetTransactionReport } from './service';

const reports = express.Router();

reports.post(
  '/transactions',
  tracedAsyncHandler(async function controllerGetTransactionReport(_req, res) {
    const data = await traced(serviceGetTransactionReport)();
    return toSuccess({ res, data, message: 'Transaction report fetched successfully!' });
  }),
);

export default reports;
