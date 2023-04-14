import { Joi } from 'celebrate';
import { roles } from '@app/constants';

export const createProductSchema = Joi.object({
  product_Name: Joi.string().required(),
  type: Joi.string().required(),
  measurement_unit: Joi.string().required(),
  ageLimit: Joi.string().required(),
  markupPrice: Joi.number().required(),
  exp_date: Joi.date().min('now').required(),
  manu_date: Joi.date().max('now').required(),
  description: Joi.string().max(300).optional(),
  quantity: Joi.number().min(5).required(),
  seller_Name: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  measurement_unit: Joi.string().optional(),
  ageLimit: Joi.string().optional(),
  markupPrice: Joi.string().required(),
  description: Joi.string().max(300).optional(),
  quantity: Joi.number().optional(),
  sell_price: Joi.string().optional(),
  //   is_verified: Joi.boolean().optional(),
  //   verification_code: Joi.string().optional().allow(null),
});
