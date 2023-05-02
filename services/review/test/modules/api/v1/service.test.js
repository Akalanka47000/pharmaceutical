import * as productService from '../../../../src/services/product.service';
import * as userService from '../../../../src/services/user.service';
import * as reviews from '../../../../src/modules/reviews/api/v1/service';
import * as repository from '../../../../src/modules/reviews/repository';
import { mockProductReviewRequestBody, mockUserReviewRequestBody, mockReviewDetails } from '../../../__mocks__';

describe('review-service-tests', () => {
  describe('test-add-review', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('01. should add product review successfully', () => {
      jest.spyOn(repository, 'findUserReview').mockResolvedValue(undefined);
      jest.spyOn(productService, 'updateProductById').mockResolvedValue(true);
      jest.spyOn(repository, 'addReview').mockResolvedValue(mockReviewDetails);
      expect(reviews.serviceAddReview(mockProductReviewRequestBody)).resolves.toStrictEqual(mockReviewDetails);
    });

    it('02. should add user review successfully', () => {
      jest.spyOn(repository, 'findUserReview').mockResolvedValue(undefined);
      jest.spyOn(userService, 'updateUserById').mockResolvedValue(true);
      jest.spyOn(repository, 'addReview').mockResolvedValue(mockReviewDetails);
      expect(reviews.serviceAddReview(mockUserReviewRequestBody)).resolves.toStrictEqual(mockReviewDetails);
    });

    it('03. should update user review successfully', () => {
      jest.spyOn(repository, 'findUserReview').mockResolvedValue(mockReviewDetails);
      jest.spyOn(repository, 'updateReview').mockResolvedValue(mockReviewDetails);
      expect(reviews.serviceAddReview(mockUserReviewRequestBody)).resolves.toStrictEqual(mockReviewDetails);
    });
  });
});
