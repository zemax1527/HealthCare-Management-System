import apiClient from './apiClient';
import { mockUsers } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * User Profile & Management Service
 * Expected endpoints:
 * GET   /api/users/profile
 * PUT   /api/users/profile
 * POST  /api/users/change-password
 * GET   /api/users (Admin only)
 */
export const userService = {
  async getProfile() {
    try {
      const response = await apiClient.get('/users/profile');
      return response.user;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        const stored = localStorage.getItem('hc_auth_user');
        return stored ? JSON.parse(stored) : mockUsers[0];
      }
      throw err;
    }
  },

  async updateProfile(updates) {
    try {
      const response = await apiClient.put('/users/profile', updates);
      return response.user;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        const stored = localStorage.getItem('hc_auth_user');
        const currentUser = stored ? JSON.parse(stored) : mockUsers[0];
        const updated = { ...currentUser, ...updates };
        localStorage.setItem('hc_auth_user', JSON.stringify(updated));
        return updated;
      }
      throw err;
    }
  },

  async changePassword(data) {
    try {
      return await apiClient.post('/users/change-password', data);
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return { message: 'Password updated successfully (Demo Mode)' };
      }
      throw err;
    }
  },

  async getAllUsers() {
    try {
      const response = await apiClient.get('/users');
      return response.users;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return mockUsers;
      }
      throw err;
    }
  },
};

