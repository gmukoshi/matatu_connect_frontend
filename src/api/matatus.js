import axiosInstance from './axios';

// Only Matatu/Route data
export const fetchMatatus = () => axiosInstance.get('/matatus');
export const fetchOccupiedSeats = (id) => axiosInstance.get(`/matatus/${id}/seats`);
export const addVehicle = (data) => axiosInstance.post('/matatus', data);
export const acceptVehicle = (id) => axiosInstance.post(`/matatus/${id}/accept`);
export const rejectVehicle = (id) => axiosInstance.post(`/matatus/${id}/reject`);