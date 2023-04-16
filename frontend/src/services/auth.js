import { axiosInstance, apiRequest } from './core/axios';

export const login = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/auth/login`, data), showLoader);
};

export const register = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/auth/register`, data), showLoader);
};

export const forgotPassword = async (data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/auth/forgot_password`, data), showLoader);
};

export const resetPassword = async (code, data, showLoader) => {
  return await apiRequest(() => axiosInstance.post(`/api/v1/auth/reset_password/${code}`, data), showLoader);
};

export const getCurrentUser = async (showLoader) => {
  return await apiRequest(() => axiosInstance.get(`/api/v1/auth/current`), showLoader);
};
