import axiosInstance from './apiClient';

// Submit a daily log
export const submitDriverLog = (data) => axiosInstance.post('/logs/', data);
