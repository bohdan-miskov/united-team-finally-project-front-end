import axios from 'axios';
import { refreshUser } from '../redux/auth/operations';

const api = axios.create({
  //baseURL: 'https://united-team-finally-project-backend.onrender.com',
  baseURL: 'http://localhost:8080',
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

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
}

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (originalRequest?.skipRefresh || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: accessToken => {
            const requestCopy = { ...originalRequest };
            requestCopy._retry = true;
            requestCopy.headers['Authorization'] = `Bearer ${accessToken}`;
            resolve(api(requestCopy));
          },
          reject: err => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const resultAction = await store.dispatch(refreshUser());

      if (refreshUser.fulfilled.match(resultAction)) {
        const newToken = resultAction.payload.accessToken;
        setAuthHeader(newToken); // оновлюємо токен в axios

        originalRequest._retry = true;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        return api({ ...originalRequest });
      } else {
        processQueue(error, null);
        clearAuthHeader();
        return Promise.reject(error);
      }
    } catch (err) {
      processQueue(err, null);
      clearAuthHeader();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
