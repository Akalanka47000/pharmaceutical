import { Review } from './api/v1/models';

export const AddReview = (review) => {
  return Review.create(review);
};

export const getSingleReview = (id) => {
  return Review.findById(id);
};

export const getAllReviews = ({ filters = {}, sorts = {}, page, limit }) => {
  if (page && limit) {
    return Review.paginate(filters, {
      page,
      limit,
      sorts,
      lean: true,
    });
  }
  return Review.find(filters).sort(sorts).lean();
};

export const deleteSingleReview = (id) => {
  return Review.findByIdAndDelete(id);
};

export const updateSingleReview = (id, pr) => {
  return Review.findByIdAndUpdate(id, pr, {
    new: true,
  }).lean();
};
