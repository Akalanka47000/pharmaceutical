import { Joi } from 'celebrate';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  measurement_unit: Joi.string().required(),
  age_limit: Joi.string().required(),
  markup_price: Joi.number().required(),
  exp_date: Joi.date().min('now').required(),
  manufactured_date: Joi.date().max('now').required(),
  description: Joi.string().max(300).optional(),
  quantity: Joi.number().min(5).required(),
  seller: Joi.string().hex().length(24).required(),
});

export const updateProductSchema = Joi.object({
  measurement_unit: Joi.string().optional(),
  age_limit: Joi.string().optional(),
  markup_price: Joi.number().required(),
  description: Joi.string().max(300).optional(),
  quantity: Joi.number().optional(),
});
