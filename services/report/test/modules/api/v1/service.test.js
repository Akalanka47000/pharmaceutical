import * as emailService from '../../../../src/services/email.service';
import * as reports from '../../../../src/modules/reports/api/v1/service';
import * as repository from '../../../../src/modules/reports/repository';
import { mockOrderDetails, mockSendEmailError } from '../../../__mocks__';

jest.mock('firebase-admin/storage', () => ({
  getStorage: () => ({
    bucket: () => ({
      upload: () => {},
      file: () => ({
        getSignedUrl: () => [],
      }),
    }),
  }),
}));

describe('report-service-tests', () => {
  describe('test-generate-order-report', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.spyOn(repository, 'getTransactionDetails').mockResolvedValue(mockOrderDetails);
    });

    it('01. should generate report successfully', async () => {
      jest.spyOn(emailService, 'sendEmail').mockResolvedValue(true);
      const res = await reports.serviceGenerateOrderReport();
      expect(res).toStrictEqual(undefined);
    });

    it('02. should fail to send email', async () => {
      jest.spyOn(emailService, 'sendEmail').mockRejectedValue(mockSendEmailError);
      const res = await reports.serviceGenerateOrderReport().catch((err) => err);
      expect(res).toHaveProperty('message', 'Failed to send email');
    });
  });
});
