import * as twilioService from '../../src/services/twilio.service';
import { mockSMSRequestBody, mockSendSMSError } from '../__mocks__';

jest.mock('twilio', () => () => ({
  messages: {
    create: () => new Promise((_resolve, reject) => reject(mockSendSMSError)),
  },
}));

describe('twillio-service-tests', () => {
  describe('test-send-sms', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });
    it('01. should fail to send sms', async () => {
      const res = await twilioService.sendSMS(mockSMSRequestBody).catch((err) => err);
      expect(res).toHaveProperty('message', "Invalid 'to' number");
    });
  });
});
