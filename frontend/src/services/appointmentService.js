import apiClient from './apiClient';
import { mockAppointments } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

let inMemoryAppointments = [...mockAppointments];

/**
 * Appointment Management Service
 * Expected endpoints:
 * GET    /api/appointments
 * GET    /api/appointments/:id
 * POST   /api/appointments
 * PUT    /api/appointments/:id
 * DELETE /api/appointments/:id/cancel
 */
export const appointmentService = {
  async getAppointments(filters = {}) {
    try {
      const response = await apiClient.get('/appointments', { params: filters });
      return response.appointments;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        let results = [...inMemoryAppointments];
        if (filters.status && filters.status !== 'All') {
          results = results.filter((a) => a.status.toLowerCase() === filters.status.toLowerCase());
        }
        if (filters.patientId) {
          results = results.filter((a) => a.patientId === filters.patientId);
        }
        if (filters.doctorId) {
          results = results.filter((a) => a.doctorId === filters.doctorId);
        }
        if (filters.search) {
          const q = filters.search.toLowerCase();
          results = results.filter(
            (a) =>
              a.doctorName?.toLowerCase().includes(q) ||
              a.patientName?.toLowerCase().includes(q) ||
              a.doctorSpecialty?.toLowerCase().includes(q)
          );
        }
        return results;
      }
      throw err;
    }
  },

  async getAppointmentById(id) {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.appointment;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return inMemoryAppointments.find((a) => a.id === id) || null;
      }
      throw err;
    }
  },

  async createAppointment(appointmentData) {
    try {
      const response = await apiClient.post('/appointments', appointmentData);
      return response.appointment;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        const newAppointment = {
          id: `apt-${Date.now()}`,
          status: 'Pending',
          ...appointmentData,
        };
        inMemoryAppointments = [newAppointment, ...inMemoryAppointments];
        return newAppointment;
      }
      throw err;
    }
  },

  async updateAppointment(id, updates) {
    try {
      const response = await apiClient.put(`/appointments/${id}`, updates);
      return response.appointment;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        inMemoryAppointments = inMemoryAppointments.map((a) =>
          a.id === id ? { ...a, ...updates } : a
        );
        return inMemoryAppointments.find((a) => a.id === id);
      }
      throw err;
    }
  },

  async cancelAppointment(id) {
    try {
      return await apiClient.delete(`/appointments/${id}/cancel`);
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        inMemoryAppointments = inMemoryAppointments.map((a) =>
          a.id === id ? { ...a, status: 'Cancelled' } : a
        );
        return { message: 'Appointment cancelled successfully' };
      }
      throw err;
    }
  },
};

