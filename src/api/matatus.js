import axiosInstance from './axios';

// Only Matatu/Route data
export const fetchMatatus = () => axiosInstance.get('/matatus');
export const fetchOccupiedSeats = (id) => axiosInstance.get(`/matatus/${id}/seats`);