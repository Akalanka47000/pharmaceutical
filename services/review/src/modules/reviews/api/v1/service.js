import { traced } from '@sliit-foss/functions';
import { AddReview, getSingleReview, getAllReviews } from '../../repository';

export const serviceAddReview = (order) => {
  return traced(AddReview)(order);
};

export const serviceGetAllReviews = (filters, sorts, page, limit) => {
  return traced(getAllReviews)({ filters, sorts, page, limit });
};

export const serviceGetSingleReview = (id) => {
  return traced(getSingleReview)(id);
};

export const serviceDeleteSingleReview = (id) => {
  return traced(deleteSingleOrder)(id);
};

export const serviceUpdateSingleReview = (id, payload) => {
  return traced(updateSingleOrder)(id, payload);
};
