import * as httpMocks from 'node-mocks-http';
import * as reportService from '../../../../src/modules/reports/api/v1/service';
import { default as reportController } from '../../../../src/modules/reports/api/v1/controller';

jest.mock('firebase-admin/storage', () => ({
  getStorage: () => ({
    bucket: () => {},
  }),
}));

describe('report-controller-tests', () => {
  describe('test-generate-order-report', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    const next = jest.fn();

    it('01. should make report generation request successfully', () => {
      jest.spyOn(reportService, 'serviceGenerateOrderReport').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'get',
        url: '/orders',
        headers: {
          'x-user-id': '640a2ca3088159d428f598a4',
        },
      });
      const res = httpMocks.createResponse();
      reportController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
});
