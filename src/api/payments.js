import axiosInstance from './axios';

// Only Transaction data
export const requestSTKPush = (payload) => axiosInstance.post('/payments/initiate', payload);
export const getPaymentStatus = (checkoutId) => axiosInstance.get(`/payments/status/${checkoutId}`);