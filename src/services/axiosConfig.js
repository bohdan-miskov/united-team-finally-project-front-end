import axios from 'axios';
import { refreshUser } from '../redux/auth/operations';

const api = axios.create({
  baseURL: 'https://united-team-finally-project-backend.onrender.com',

export const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = '';

api.interceptors.response.use(
  response => response,
  async error => {

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
