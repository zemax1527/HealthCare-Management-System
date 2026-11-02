import apiClient from './apiClient';
import { mockNotifications } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

let inMemoryNotifications = [...mockNotifications];

/**
 * Notifications API Service
 * Expected endpoints:
 * GET  /api/notifications
 * PUT  /api/notifications/:id/read
 * POST /api/notifications/mark-all-read
 */
export const notificationService = {
  async getNotifications() {
    try {
      const response = await apiClient.get('/notifications');
      return response.notifications;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return inMemoryNotifications;
      }
      throw err;
    }
  },

  async markNotificationAsRead(id) {
    try {
      return await apiClient.put(`/notifications/${id}/read`);
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        inMemoryNotifications = inMemoryNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
        return { message: 'Marked as read' };
      }
      throw err;
    }
  },

  async markAllAsRead() {
    try {
      return await apiClient.post('/notifications/mark-all-read');
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        inMemoryNotifications = inMemoryNotifications.map((n) => ({ ...n, read: true }));
        return { message: 'All marked as read' };
      }
      throw err;
    }
  },
};

