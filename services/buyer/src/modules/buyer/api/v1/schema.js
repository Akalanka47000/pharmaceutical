import { Joi } from 'celebrate';

export const createBuyerSchema = Joi.object({
  nic: Joi.string().min(10).max(12).required(),
  credential_id: Joi.string().required(),
});

export const updateBuyerSchema = Joi.object({
  nic: Joi.string().min(10).max(12).optional(),
});
