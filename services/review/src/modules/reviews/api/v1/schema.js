import { Joi } from 'celebrate';

export const addReviewSchema = Joi.object({
  review_id: Joi.string().required(),
  user_id: Joi.string().required(),
  product_id: Joi.string().required(),
  content: Joi.string().required(),
  timeStamp: Joi.string().required(),
});
