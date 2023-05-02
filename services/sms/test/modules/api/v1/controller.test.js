import * as httpMocks from 'node-mocks-http';
import * as smsService from '../../../../src/services/twilio.service';
import { default as smsController } from '../../../../src/modules/sms/api/v1/controller';
import { mockSMSRequestBody } from '../../../__mocks__';

describe('sms-controller-tests', () => {
  describe('test-send-sms', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    const next = jest.fn();

    it('01. should send sms successfully', () => {
      jest.spyOn(smsService, 'sendSMS').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'post',
        url: '/',
        body: mockSMSRequestBody,
      });
      const res = httpMocks.createResponse();
      smsController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
});
