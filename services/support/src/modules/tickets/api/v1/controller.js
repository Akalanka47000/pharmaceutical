import express from 'express';
import { celebrate, Segments } from 'celebrate';
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler, traced } from '@sliit-foss/functions';
import { objectIdSchema } from '@app/constants';
import { toSuccess } from '@app/middleware';
import { serviceCreateTicket, serviceGetTickets, serviceGetTicketById } from './service';
import { createTicketSchema } from './schema';

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
    const data = await traced(serviceGetTickets)(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({ res, data, message: 'Tickets fetched successfully!' });
  }),
);

ticket.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: objectIdSchema() }),
  tracedAsyncHandler(async function controllerGetTicketById(req, res) {
    const data = await traced(serviceGetTicketById)(req.params.id);
    return toSuccess({ res, data, message: 'Ticket fetched successfully!' });
  }),
);

export default ticket;
