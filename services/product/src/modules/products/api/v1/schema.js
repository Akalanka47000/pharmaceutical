import { Joi } from 'celebrate';

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid('Supplements and Herbs', 'Sports and Nutrition', 'Medicine', 'Beauty', 'Bath').required(),
  measurement_unit: Joi.string().required(),
  age_limit: Joi.number().optional(),
  markup_price: Joi.number().required(),
  exp_date: Joi.date().min('now').required(),
  manufactured_date: Joi.date().max('now').required(),
  description: Joi.string().max(500).optional(),
  stock: Joi.number().min(5).required(),
  image: Joi.string().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  type: Joi.string().valid('Supplements and Herbs', 'Sports and Nutrition', 'Medicine', 'Beauty', 'Bath').optional(),
  measurement_unit: Joi.string().optional(),
  age_limit: Joi.string().optional(),
  markup_price: Joi.number().optional(),
  description: Joi.string().max(300).optional(),
  exp_date: Joi.date().min('now').optional(),
  manufactured_date: Joi.date().max('now').optional(),
  stock: Joi.number().optional(),
  image: Joi.string().optional(),
  reviews: Joi.array().items(Joi.string().hex().length(24).required()).optional(),
  review: Joi.string().hex().length(24).optional(),
  $inc: Joi.object({
    stock: Joi.number().optional(),
  }).optional(),
});
