import { axiosInstance, apiRequest } from './core/axios';

export const createUser = async (data) => {
  return await apiRequest(() => axiosInstance.post(`/api/users`, data));
};

export const getAllUsers = async (filterQuery = '', sortQuery = '') => {
  return await apiRequest(() => axiosInstance.get(`/api/users?${filterQuery}&${sortQuery}`));
};

export const updateUser = async (id, data) => {
  return await apiRequest(() => axiosInstance.put(`/api/users/${id}`, data));
};

export const deleteUser = async (id) => {
  return await apiRequest(() => axiosInstance.delete(`/api/users/${id}`));
};
