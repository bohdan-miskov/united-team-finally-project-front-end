import axios from 'axios';
import { refreshUser } from '../redux/auth/operations';

const api = axios.create({
  baseURL: 'https://united-team-finally-project-backend.onrender.com',
});

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

let store;
export const injectStore = _store => {
  store = _store;
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !['/auth/login', '/auth/register', '/auth/refresh'].includes(
        originalRequest.url
      )
    ) {
      originalRequest._retry = true;

      if (!store) return Promise.reject(error);

      try {
        const resultAction = await store.dispatch(refreshUser());

        if (refreshUser.fulfilled.match(resultAction)) {
          return api(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } catch {
        clearAuthHeader();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
