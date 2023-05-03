import { Joi } from 'celebrate';

export const createTicketSchema = Joi.object({
  user: Joi.string().hex().length(24).required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const replyTicketSchema = Joi.object({
  message: Joi.string().required(),
});
