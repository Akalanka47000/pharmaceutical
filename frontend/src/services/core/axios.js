import axios from 'axios';
import { toast } from 'react-toastify';
import { default as store } from '../../store';
import { toggleLoader } from '../../store/ui/global';
import { refreshToken } from '../auth';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token') || sessionStorage.getItem('access_token')}`;
  return config;
});

export const apiRequest = async (request, showLoader = true) => {
  store.dispatch(toggleLoader(showLoader));
  const response = await request()
    .then((res) => res.data)
    .catch(async (error) => {
      const message = error.response.data.message;
      if (error.response.status === 403) {
        if (localStorage.getItem('token')) {
          toast.error(message);
        }
      } else if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
        const { data } = await refreshToken({ refresh_token: localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token') });
        const store = localStorage.getItem('refresh_token') ? localStorage : sessionStorage;
        store.setItem('access_token', data.access_token);
        store.setItem('refresh_token', data.refresh_token);
        return await apiRequest(request, showLoader);
      } else {
        toast.error(message);
      }
      return null;
    });
  store.dispatch(toggleLoader(false));
  return response;
};
