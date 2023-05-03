import { Joi } from 'celebrate';

export const createTicketSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export const replyTicketSchema = Joi.object({
  message: Joi.string().required(),
});
