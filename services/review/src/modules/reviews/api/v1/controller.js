import express from 'express';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { toSuccess } from '@app/middleware';

const review = express.Router();

review.get(
  '/',
  tracedAsyncHandler(async function controllerGetOrderById(req, res) {
    return toSuccess({ res, data: {}, message: 'sucess!' });
  }),
);

export default review;
