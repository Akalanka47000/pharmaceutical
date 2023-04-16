import { Joi } from 'celebrate';
import { roles } from '@app/constants';

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().optional(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .optional(),
  mobile: Joi.string()
    .pattern(/^[0-9]\d{9}$/)
    .required(),
  address: Joi.string().required(),
  is_active: Joi.boolean().optional(),
  is_verified: Joi.boolean().optional(),
  verification_code: Joi.string().optional(),
  business: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    license_number: Joi.string().required(),
    owner_nic: Joi.string().required(),
    is_approved: Joi.boolean().optional(),
  }).optional(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  password: Joi.string().optional(),
  address: Joi.string().optional(),
  is_active: Joi.boolean().optional(),
  is_verified: Joi.boolean().optional(),
  mobile: Joi.string()
    .pattern(/^[0-9]\d{9}$/)
    .optional(),
  verification_code: Joi.string().optional().allow(null),
  business: Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    license_number: Joi.string().optional(),
    owner_nic: Joi.string().optional(),
    is_approved: Joi.boolean().optional(),
  }).optional(),
});
