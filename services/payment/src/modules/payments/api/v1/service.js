import { traced } from '@sliit-foss/functions';
import { createPaymentIntent } from '../../../../services';

export const serviceInitializePayment = (payment, userId) => {
  return traced(createPaymentIntent)({
    amount: Number((payment.amount * 100).toFixed(0)),
    currency: 'lkr',
    metadata: {
      ...payment.metadata,
      user_id: userId,
    },
  });
};
