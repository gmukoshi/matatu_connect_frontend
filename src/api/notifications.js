import axiosInstance from './axios';

export const fetchNotifications = () => axiosInstance.get('/notifications/');

export const markNotificationRead = (id) => axiosInstance.put(`/notifications/${id}/read`);
