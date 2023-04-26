import { Joi } from 'celebrate';

export const addReviewSchema = Joi.object({
  entity_id: Joi.string().hex().length(24).required(),
  entity_type: Joi.string().valid('product', 'seller').required(),
  content: Joi.string().required(),
});
