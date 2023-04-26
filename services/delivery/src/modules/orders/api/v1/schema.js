import { Joi } from 'celebrate';

export const createOrderSchema = Joi.object({
  invoice_id: Joi.string().required(),
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  customer_details: Joi.object({
    email: Joi.string().optional(),
    phone: Joi.string().required(),
  }).required(),
});
