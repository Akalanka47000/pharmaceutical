import { Joi } from 'celebrate';

export const initializePaymentSchema = Joi.object({
  amount: Joi.number().required(),
  metadata: Joi.object().optional().default({}),
});
