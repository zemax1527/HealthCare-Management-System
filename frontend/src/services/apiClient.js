import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Centralized Axios instance configured for REST API communication.
 * Automatically injects authorization tokens and standardizes response/error payloads.
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // For HTTP-only cookie authentication if configured on Express
});

// Request interceptor: injects Bearer token from localStorage or session
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hc_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handles standardized error messages and expired sessions (401)
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred with the server.',
      status: error.response?.status,
      errors: error.response?.data?.errors || null,
      isNetworkError: !error.response,
    };

    if (error.response?.status === 401) {
      // Clear expired auth credentials if not already on login
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('hc_auth_token');
        localStorage.removeItem('hc_auth_user');
      }
    }

    return Promise.reject(customError);
  }
);

export default apiClient;

