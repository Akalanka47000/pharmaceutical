import { axiosInstance, apiRequest } from './core/axios';

export const getAllProducts = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/products?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};
