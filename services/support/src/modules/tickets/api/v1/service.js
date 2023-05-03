import createError from 'http-errors';
import { traced } from '@sliit-foss/functions';
import { roles } from '@app/constants';
import { createTicketInDB, getAllTickets, getTicketById, updateTicketById } from '../../repository';
import { statuses } from '../../constants';

export const serviceCreateTicket = (ticket, user) => {
  return traced(createTicketInDB)({ ...ticket, user });
};

export const serviceGetTickets = (filters, sorts, page, limit) => {
  return traced(getAllTickets)({ filters, sorts, page, limit });
};

export const serviceGetTicketById = async (id, user) => {
  const ticket = await traced(getTicketById)(id);
  if (user.role !== roles.admin && ticket.user?._id !== user._id) {
    throw createError(403, 'You are not allowed to access this resource');
  }
  return ticket;
};

export const serviceReplyTicketById = async (id, message, user) => {
  const ticket = await serviceGetTicketById(id, user);
  return traced(updateTicketById)(id, {
    replies: [
      ...ticket.replies,
      {
        user: user._id,
        message,
      },
    ],
  });
};

export const serviceCloseTicketById = (id) => {
  return traced(updateTicketById)(id, { status: statuses.resolved });
};
