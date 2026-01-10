import axiosInstance from './axios';

// Fetch bookings (filtered by role on backend)
export const fetchBookings = () => axiosInstance.get('/bookings');

// Create a new booking
export const createBooking = (data) => axiosInstance.post('/bookings', data);
