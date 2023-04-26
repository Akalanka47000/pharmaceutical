import { Review } from './api/v1/models';

export const addReview = (review) => {
  return Review.create(review);
};
