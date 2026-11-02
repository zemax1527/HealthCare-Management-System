import apiClient from './apiClient';
import { mockUsers } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * Authentication API Service
 * Expected endpoints:
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/logout
 * GET  /api/auth/me
 */
export const authService = {
  async register(data) {
    try {
      const response = await apiClient.post('/auth/register', data);
      return response;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        // Fallback for UI demonstration
        const newUser = {
          id: `usr-${Date.now()}`,
          fullName: data.fullName,
          email: data.email,
          role: data.role || 'patient',
          phone: '+1 (555) 000-0000',
        };
        const token = `mock-jwt-token-${Date.now()}`;
        return { user: newUser, token, message: 'Account registered successfully (Demo Mode)' };
      }
      throw err;
    }
  },

  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        // Find matching mock user or default to patient
        const matched = mockUsers.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase()) || {
          id: `usr-${Date.now()}`,
          fullName: credentials.email.split('@')[0],
          email: credentials.email,
          role: 'patient',
        };
        const token = `mock-jwt-token-${Date.now()}`;
        return { user: matched, token, message: 'Login successful (Demo Mode)' };
      }
      throw err;
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore network errors on logout in demo mode
    } finally {
      localStorage.removeItem('hc_auth_token');
      localStorage.removeItem('hc_auth_user');
    }
  },

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return response.user;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        const stored = localStorage.getItem('hc_auth_user');
        return stored ? JSON.parse(stored) : mockUsers[0];
      }
      throw err;
    }
  },
};

