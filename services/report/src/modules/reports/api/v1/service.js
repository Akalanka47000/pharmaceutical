import { traced } from '@sliit-foss/functions';
import { getTransactionDetails } from '../../repository';

export const serviceGenerateOrderReport = () => {
  return traced(getTransactionDetails)();
};
