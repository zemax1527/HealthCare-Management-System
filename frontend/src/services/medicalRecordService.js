import apiClient from './apiClient';
import { mockMedicalRecords } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * Medical Records API Service
 * Expected endpoints:
 * GET /api/medical-records
 * GET /api/medical-records/:id
 */
export const medicalRecordService = {
  async getMedicalRecords(filters = {}) {
    try {
      const response = await apiClient.get('/medical-records', { params: filters });
      return response.records;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        let results = [...mockMedicalRecords];
        if (filters.category && filters.category !== 'All') {
          results = results.filter((r) => r.category.toLowerCase() === filters.category.toLowerCase());
        }
        if (filters.patientId) {
          results = results.filter((r) => r.patientId === filters.patientId);
        }
        if (filters.search) {
          const q = filters.search.toLowerCase();
          results = results.filter(
            (r) =>
              r.title.toLowerCase().includes(q) ||
              r.doctor.toLowerCase().includes(q) ||
              r.facility.toLowerCase().includes(q)
          );
        }
        return results;
      }
      throw err;
    }
  },

  async getMedicalRecordById(id) {
    try {
      const response = await apiClient.get(`/medical-records/${id}`);
      return response.record;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return mockMedicalRecords.find((r) => r.id === id) || null;
      }
      throw err;
    }
  },
};

