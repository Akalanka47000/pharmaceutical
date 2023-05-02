import * as httpMocks from 'node-mocks-http';
import * as emailService from '../../../../src/modules/emails/api/v1/service';
import { default as emailController } from '../../../../src/modules/emails/api/v1/controller';
import { mockEmailRequestBody } from '../../../__mocks__';

describe('email-controller-tests', () => {
  describe('test-send-mail', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    const next = jest.fn();

    it('01. should send email successfully', () => {
      jest.spyOn(emailService, 'serviceSendEmail').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'post',
        url: '/',
        body: mockEmailRequestBody,
      });
      const res = httpMocks.createResponse();
      emailController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
});
