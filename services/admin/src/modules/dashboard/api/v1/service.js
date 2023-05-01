import { traced } from '@sliit-foss/functions';
import { getSystemTotals } from '../../repository';

export const getSystemTotalsSvc = () => {
  return traced(getSystemTotals)();
};
