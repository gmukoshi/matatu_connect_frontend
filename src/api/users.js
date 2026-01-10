import axiosInstance from './axios';

// Drivers
export const fetchDrivers = () => axiosInstance.get('/users/manager/drivers');
export const inviteDriver = (email) => axiosInstance.post('/users/manager/invite', { email });
