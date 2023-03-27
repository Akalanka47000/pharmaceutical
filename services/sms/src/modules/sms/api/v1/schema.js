import { Joi } from 'celebrate';

export const sendSMSSchema = Joi.object({
  to: Joi.string().required(),
  body: Joi.string().required(),
});
