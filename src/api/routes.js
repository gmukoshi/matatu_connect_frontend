import axiosInstance from './apiClient';

// Fetch all routes
export const fetchRoutes = () => axiosInstance.get('/routes/');

// Create a new route
export const createRoute = (data) => axiosInstance.post('/routes/', data);
