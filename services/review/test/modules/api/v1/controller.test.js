import * as httpMocks from 'node-mocks-http';
import * as reviewService from '../../../../src/modules/reviews/api/v1/service';
import { default as reviewController } from '../../../../src/modules/reviews/api/v1/controller';
import { mockProductReviewRequestBody } from '../../../__mocks__';

describe('review-controller-tests', () => {
  describe('test-add-review', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    const next = jest.fn();

    it('01. should add a review successfully', () => {
      jest.spyOn(reviewService, 'serviceAddReview').mockResolvedValue(true);
      const req = httpMocks.createRequest({
        method: 'post',
        url: '/',
        body: mockProductReviewRequestBody,
      });
      const res = httpMocks.createResponse();
      reviewController(req, res, next);
      expect(res.statusCode).toBe(200);
    });
  });
});
