import { traced } from '@sliit-foss/functions';
import { getCollectionTotals } from '../../repository';

export const getSystemTotalsSvc = () => {
  return traced(getCollectionTotals)();
};
