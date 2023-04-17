import { Joi } from 'celebrate';
import { orderStatuses } from '@app/constants';

export const createOrderSchema = Joi.object({
  products: Joi.array().items(Joi.string().hex().length(24).required()).required(),
  quantity: Joi.array().number().min(1).required(),
  price: Joi.number().required(),
  user: Joi.string().hex().length(24).required(),
  total: Joi.number().required(),
  status: Joi.string()
    .valid(...Object.values(orderStatuses))
    .optional(),
  delivery_id: Joi.string().hex().length(24).optional(),
});

export const updateOrderSchema = Joi.object({
  products: Joi.array().items(Joi.string().hex().length(24).required()).optional(),
  quantity: Joi.array().number().min(1).optional(),
  user: Joi.string().hex().length(24).optional(),
  total: Joi.number().optional(),
  status: Joi.string()
    .valid(...Object.values(orderStatuses))
    .optional(),
  delivery_id: Joi.string().hex().length(24).optional(),
});
