import { axiosInstance, apiRequest } from './core/axios';

export const getAllProducts = async (filterQuery = '', sortQuery = '', page) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/product?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};
