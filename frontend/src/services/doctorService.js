import apiClient from './apiClient';
import { mockDoctorsList } from '../data/mockData';

const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false';

/**
 * Doctor Directory Service
 * Expected endpoints:
 * GET /api/doctors
 * GET /api/doctors/:id
 */
export const doctorService = {
  async getDoctors(params = {}) {
    try {
      const response = await apiClient.get('/doctors', { params });
      return response.doctors;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        let results = [...mockDoctorsList];
        if (params.search) {
          const q = params.search.toLowerCase();
          results = results.filter(
            (d) =>
              d.name.toLowerCase().includes(q) ||
              d.specialty.toLowerCase().includes(q) ||
              d.hospital.toLowerCase().includes(q)
          );
        }
        if (params.specialty && params.specialty !== 'All') {
          results = results.filter((d) => d.specialty.toLowerCase().includes(params.specialty.toLowerCase()));
        }
        return results;
      }
      throw err;
    }
  },

  async getDoctorById(id) {
    try {
      const response = await apiClient.get(`/doctors/${id}`);
      return response.doctor;
    } catch (err) {
      if (USE_MOCK && (err.isNetworkError || err.status === 404)) {
        return mockDoctorsList.find((d) => d.id === id) || mockDoctorsList[0];
      }
      throw err;
    }
  },
};

