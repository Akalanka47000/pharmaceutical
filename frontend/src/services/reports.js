import { axiosInstance, apiRequest } from './core/axios';

export const getTransactionReport = (showLoader) => {
  return apiRequest(() => axiosInstance.get(`/api/v1/reports/transactions`), showLoader);
};