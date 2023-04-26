import { axiosInstance, apiRequest } from './core/axios';

export const getAllOrders = async (filterQuery = '', sortQuery = '', page = 1) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/orders?${filterQuery}&${sortQuery}page=${page}&limit=${20}`));
};

export const getAllOrdersNoPagination = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/orders?${filterQuery}&${sortQuery}`));
};

export const createOrder = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/orders`, data));
};

export const updateOrder = async (id, data) => {
  return await apiRequest(() => axiosInstance.patch(`/api/v1/orders/${id}`, data));
};

export const deleteOrder = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/api/v1/orders/${id}`));
};
