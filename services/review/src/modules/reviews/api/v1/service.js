import { traced } from '@sliit-foss/functions';
import { addReview, findUserReview, updateReview } from '../../repository';
import { updateProductById, updateUserById } from '../../../../services';

export const serviceAddReview = async (payload, user) => {
  const existingReview = await findUserReview(user);
  if (existingReview) {
    return updateReview(existingReview._id, { rating: payload.rating });
  }
  const review = await traced(addReview)({ rating: payload.rating, user });
  const entityUpdateFn = payload.entity_type === 'product' ? updateProductById : updateUserById;
  await entityUpdateFn(payload.entity_id, {
    review: review._id,
  });
  return review;
};
