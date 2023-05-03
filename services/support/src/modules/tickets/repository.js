import { isEmpty } from 'lodash';
import { aggregatePopulate } from '@app/mongoose';
import { Ticket } from './api/v1/models';

export function createTicketInDB(ticket) {
  return Ticket.create(ticket);
}

export function getTicketById(id) {
  return Ticket.findById(id).lean();
}

export function getAllTickets({ filters = {}, sorts: sort = {}, page, limit }) {
  if (page && limit) {
    const pipeline = [...aggregatePopulate(['users', 'user'])];
    if (!isEmpty(filters)) {
      pipeline.unshift({
        $match: filters,
      });
    }
    if (!isEmpty(sort)) {
      pipeline.unshift({
        $sort: sort,
      });
    }
    const aggregate = Ticket.aggregate(pipeline);
    return Ticket.aggregatePaginate(aggregate, {
      page,
      limit,
    });
  }
  return Ticket.find(filters).sort(sort).lean();
}

export function updateTicketById(id, data) {
  return Ticket.findByIdAndUpdate(id, data, { new: true }).lean();
}
