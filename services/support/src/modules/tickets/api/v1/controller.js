import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { roles, objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { serviceCreateTicket, serviceGetTickets, serviceGetTicketById, serviceCloseTicketById, serviceReplyTicketById } from './service';
import { createTicketSchema, replyTicketSchema } from './schema';

const ticket = express.Router();

ticket.post(
  '/',
  celebrate({ [Segments.BODY]: createTicketSchema }),
  tracedAsyncHandler(async function controllerCreateTicket(req, res) {
    const data = await traced(serviceCreateTicket)(req.body, req.headers['x-user-id']);
    return toSuccess({ res, data, message: 'Ticket created successfully!' });
  }),
);

ticket.get(
  '/',
  filterQuery,
  tracedAsyncHandler(async function controllerGetTickets(req, res) {
    if (req.headers['x-user-role'] !== roles.admin) {
      req.query.filter.user = req.headers['x-user-id'];
    }
    const data = await traced(serviceGetTickets)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({ res, data, message: 'Tickets fetched successfully!' });
  }),
);

ticket.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerGetTicketById(req, res) {
    const data = await traced(serviceGetTicketById)(req.params.id, { _id: req.headers['x-user-id'], role: req.headers['x-user-role'] });
    return toSuccess({ res, data, message: 'Ticket fetched successfully!' });
  }),
);

ticket.patch(
  '/:id/reply',
  celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: replyTicketSchema }),
  tracedAsyncHandler(async function controllerReplyTicketById(req, res) {
    await traced(serviceReplyTicketById)(req.params.id, req.body.message, { _id: req.headers['x-user-id'], role: req.headers['x-user-role'] });
    return toSuccess({ res, message: 'Reply added successfully!' });
  }),
);

ticket.patch(
  '/:id/close',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerCloseTicketById(req, res) {
    await traced(serviceCloseTicketById)(req.params.id);
    return toSuccess({ res, message: 'Ticket closed successfully!' });
  }),
);

export default ticket;
