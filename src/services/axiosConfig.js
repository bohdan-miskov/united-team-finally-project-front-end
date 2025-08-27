import axios from 'axios';
import { refreshUser } from '../redux/auth/operations';

const api = axios.create({
  baseURL: 'https://united-team-finally-project-backend.onrender.com',
  //baseURL: 'http://localhost:8080',
  withCredentials: true,
});

// api.defaults.headers.common.Authorization = `Bearer ${token}`;

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';
};

// Змінна для передачі store
let store;
export const injectStore = _store => {
  store = _store;
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Перевіряємо, чи цей thunk позначений skipRefresh
    if (originalRequest?.skipRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
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
