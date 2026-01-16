import axiosInstance from './apiClient';

// Submit a daily log
// Submit a daily log
export const submitDriverLog = (data) => axiosInstance.post('/logs/', data);

// Fetch logs (Manager)
export const fetchLogs = () => axiosInstance.get('/logs/');
