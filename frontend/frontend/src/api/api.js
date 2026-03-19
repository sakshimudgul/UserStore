import axios from 'axios';
import config from '../config/config';

const API_URL = config.apiUrl;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ... rest of your api.js code

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/users/register', userData);
export const login = (credentials) => api.post('/users/login', credentials);
export const getProfile = () => api.get('/users/profile');
export const updateProfile = (userData) => api.put('/users/profile', userData);
export const getAllUsers = () => api.get('/users');

export default api;