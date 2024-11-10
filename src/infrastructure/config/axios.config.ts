import axios from 'axios';
import { env } from './env.config';

export const axiosInstance = axios.create({
  baseURL: env.mealdbBaseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error or handle specific status codes
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);
