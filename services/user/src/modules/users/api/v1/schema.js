import { Joi } from 'celebrate';
import { roles } from '../../constants';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  role: Joi.string().valid(...roles).optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().optional(),
});
