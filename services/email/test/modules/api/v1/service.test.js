import * as nodemailer from '../../../../src/services/nodemailer.service';
import * as emails from '../../../../src/modules/emails/api/v1/service';
import { mockEmailRequestBody, mockSendEmailError } from '../../../__mocks__';

describe('email-service-tests', () => {
  describe('test-send-mail', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('01. should send email successfully', () => {
      jest.spyOn(nodemailer, 'sendMail').mockResolvedValue(true);
      expect(emails.serviceSendEmail(mockEmailRequestBody)).resolves.toStrictEqual(undefined);
    });

    it('02. should fail to send email', () => {
      expect(emails.serviceSendEmail({ ...mockEmailRequestBody, template: 'dummy_template' })).rejects.toHaveProperty('message', 'Template not found');
    });

    it('03. should fail to send email', () => {
      jest.spyOn(nodemailer, 'sendMail').mockRejectedValue(mockSendEmailError);
      expect(emails.serviceSendEmail(mockEmailRequestBody)).rejects.toHaveProperty('message', 'Failed to send email - Mock Error');
    });

    it('04. should fail to send email', () => {
      jest.spyOn(nodemailer, 'sendMail').mockResolvedValue(false);
      expect(emails.serviceSendEmail(mockEmailRequestBody)).rejects.toHaveProperty('message', 'Failed to send email');
    });
  });
});
