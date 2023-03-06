import { Joi } from 'celebrate';

export const sendEmailSchema = Joi.object({
  name: Joi.string().required(),
});