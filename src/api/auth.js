import axiosInstance from './apiClient';

export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
};

// Optional: logout is usually handled by clearing local storage,
// but you can notify the backend if you have a blacklist setup.
export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
};
