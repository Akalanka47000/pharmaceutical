import { Joi } from 'celebrate';

export const createSellerSchema = Joi.object({
  business_name: Joi.string().required(),
  business_email: Joi.string().email().required(),
  license_number: Joi.string().required(),
  owner_nic: Joi.string().optional(),
});

export const updateSellerSchema = Joi.object({
  business_name: Joi.string().optional(),
  business_email: Joi.string().email().optional(),
});
