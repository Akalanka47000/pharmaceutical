import { Review } from './api/v1/models';

export const addReview = (review) => {
  return Review.create(review);
};

export const findUserReview = (user) => {
  return Review.findOne({ user }).lean();
};

export const updateReview = (id, data) => {
  return Review.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
};
