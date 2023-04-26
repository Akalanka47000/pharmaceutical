import { traced } from '@sliit-foss/functions';
import { addReview } from '../../repository';
import { updateProductById, updateUserById } from '../../../../services';

export const serviceAddReview = async (payload) => {
  const review = await traced(addReview)({ content: payload.content });
  const entityUpdateFn = payload.entity_type === 'product' ? updateProductById : updateUserById;
  await entityUpdateFn(payload.entity_id, {
    review: review._id,
  });
  return review;
};
