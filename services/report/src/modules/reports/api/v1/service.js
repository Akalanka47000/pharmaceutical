import { traced } from '@sliit-foss/functions';
import { getTransactionDetails } from '../../repository';

export const serviceGetTransactionReport = () => {
  return traced(getTransactionDetails)();
};
