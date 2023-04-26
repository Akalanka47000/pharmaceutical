import express from 'express';
import { toSuccess } from '@app/middleware';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { serviceAddReview } from './service';
import { addReviewSchema } from './schema';

const review = express.Router();

review.post(
  '/',
  celebrate({ [Segments.BODY]: addReviewSchema }),
  tracedAsyncHandler(async function controllerAddReview(req, res) {
    const data = await traced(serviceAddReview)(req.body);
    return toSuccess({ res, data, message: 'Review added successfully!' });
  }),
);

export default review;
