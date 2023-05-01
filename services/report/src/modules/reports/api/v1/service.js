import { traced } from '@sliit-foss/functions';
import { getTransactionDetails } from '../../repository';

export const serviceGetTransactionReport = async () => {
  return traced(getTransactionDetails)();
};
