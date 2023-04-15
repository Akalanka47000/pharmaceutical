import { Joi } from 'celebrate';
//import { roles } from '@app/constants';

export const createBuyerSchema = Joi.object({
  buyer_name: Joi.string().required(),
  nic: Joi.string().min(10).max(12).required(),
  email_address: Joi.string().email().required(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]\d{9}$/)
    .required(),
  address: Joi.string().max(200).required(),
  address_district: Joi.string().required(),
  credentialID: Joi.string().required(),
});

export const updateBuyerSchema = Joi.object({
  email: Joi.string().email().optional(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]\d{9}$/)
    .optional(),
  address: Joi.string().max(200).optional(),
  address_district: Joi.string().optional(),
  //   is_verified: Joi.boolean().optional(),
  //   verification_code: Joi.string().optional().allow(null),
});
