import express from 'express';
import { toSuccess } from '@app/middleware';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { serviceGenerateOrderReport } from './service';

const reports = express.Router();

reports.get(
  '/orders',
  tracedAsyncHandler(function controllerGenerateOrderReport(req, res) {
    traced(serviceGenerateOrderReport)(req.headers['x-user-email']);
    return toSuccess({ res, message: 'Report generation request made!' });
  }),
);

export default reports;
