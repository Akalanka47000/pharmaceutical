import * as httpMocks from 'node-mocks-http';
import * as ticketService from '../../../../src/modules/tickets/api/v1/service';
import { default as ticketController } from '../../../../src/modules/tickets/api/v1/controller';
import { mockAddTicketRequestBody } from '../../../__mocks__';

describe('ticket-controller-tests', () => {
  const next = jest.fn();

  it('01. should add a ticket successfully', () => {
    jest.spyOn(ticketService, 'serviceCreateTicket').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockAddTicketRequestBody,
    });
    const res = httpMocks.createResponse();
    ticketController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
