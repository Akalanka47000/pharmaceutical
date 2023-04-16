import { Joi } from 'celebrate';
import { roles } from '@app/constants';

export const orderSchema = Joi.object({
  product_ID: Joi.string().required(),
  quantity: Joi.Number().required(),
  payment_method: Joi.string().required(),
  delivery_type: Joi.string().required(),
  delivery_cost: Joi.Number().required(),
  discounts: Joi.Number().required(),
  total_price: Joi.Number().required(),
  status: Joi.string().optional(),
});

export const updateOrderSchema = Joi.object({
  product_ID: Joi.string().optional(),
  quantity: Joi.Number().optional(),
  payment_method: Joi.string().optional(),
  delivery_type: Joi.string().optional(),
});
