import apiClient from './apiClient';
import { mockPrescriptions } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

let inMemoryPrescriptions = [...mockPrescriptions];

/**
 * Prescriptions API Service
 * Expected endpoints:
 * GET  /api/prescriptions
 * GET  /api/prescriptions/:id
 * POST /api/prescriptions (Doctor only)
 */
export const prescriptionService = {
  async getPrescriptions(filters = {}) {
    try {
      const response = await apiClient.get('/prescriptions', { params: filters });
      return response.prescriptions;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        let results = [...inMemoryPrescriptions];
        if (filters.patientId) {
          results = results.filter((p) => p.patientId === filters.patientId);
        }
        if (filters.search) {
          const q = filters.search.toLowerCase();
          results = results.filter(
            (p) =>
              p.medicineName.toLowerCase().includes(q) ||
              p.doctorName.toLowerCase().includes(q)
          );
        }
        return results;
      }
      throw err;
    }
  },

  async getPrescriptionById(id) {
    try {
      const response = await apiClient.get(`/prescriptions/${id}`);
      return response.prescription;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return inMemoryPrescriptions.find((p) => p.id === id) || null;
      }
      throw err;
    }
  },

  async createPrescription(prescriptionData) {
    try {
      const response = await apiClient.post('/prescriptions', prescriptionData);
      return response.prescription;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        const newPrescription = {
          id: `rx-${Date.now()}`,
          prescribedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Active',
          refillsLeft: 3,
          ...prescriptionData,
        };
        inMemoryPrescriptions = [newPrescription, ...inMemoryPrescriptions];
        return newPrescription;
      }
      throw err;
    }
  },
};

