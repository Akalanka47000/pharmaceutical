import { Ticket } from './api/v1/models';

export function createTicketInDB(order) {
  return Ticket.create(order);
}

export function getTicketById(id) {
  return Ticket.findById(id).lean();
}

export function getAllTickets({ filters = {}, sorts: sort = {}, page, limit }) {
  if (page && limit) {
    return Ticket.paginate(filters, {
      page,
      limit,
      sort,
      lean: true,
    });
  }
  return Ticket.find(filters).sort(sort).lean();
}
