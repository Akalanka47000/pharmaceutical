import { Joi } from 'celebrate';

export const sendEmailSchema = Joi.object({
  template: Joi.string().required(),
  data: Joi.object().required(),
  options: {
    to: Joi.array().items(Joi.string().email()).required(),
    cc: Joi.array().items(Joi.string().email()),
    bcc: Joi.array().items(Joi.string().email()),
    subject: Joi.string().required(),
    attachments: Joi.array().optional(),
  }
});