import axios from 'axios';
import toast from 'react-hot-toast';
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

/**
 * Central Axios instance. Every service module in /services imports this
 * instead of calling axios directly, so auth headers and error handling
 * stay in one place.
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Attach the JWT (if present) to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Let the app react to a session that just went invalid, without every
// component having to know about it. main.jsx / AuthContext listens for this.
export const AUTH_EXPIRED_EVENT = 'petlink:auth-expired';

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      const hadToken = Boolean(localStorage.getItem(STORAGE_KEYS.TOKEN));
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      if (hadToken) {
        window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
        toast.error('Your session has expired. Please sign in again.');
      }
    } else if (status >= 500) {
      toast.error('Something went wrong on our end. Please try again shortly.');
    } else if (!error.response) {
      toast.error('Network error — check your connection and try again.');
    }

    return Promise.reject(error);
  }
);

export default api;
