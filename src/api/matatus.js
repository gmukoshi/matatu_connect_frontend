import axiosInstance from './axios';

export const fetchAllMatatus = async (params) => {
    // params could include { route: 'Nairobi-Thika', page: 1 }
    const response = await axiosInstance.get('/matatus', { params });
    return response.data;
};

export const getMatatuById = async (id) => {
    const response = await axiosInstance.get(`/matatus/${id}`);
    return response.data;
};

export const createMatatu = async (matatuData) => {
    const response = await axiosInstance.post('/matatus', matatuData);
    return response.data;
};
