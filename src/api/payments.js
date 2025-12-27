import axiosInstance from './axios';

export const initiateStkPush = async (phoneNumber, amount, bookingId) => {
    const response = await axiosInstance.post('/payments/stk-push', {
        phone: phoneNumber,
        amount: amount,
        booking_id: bookingId,
    });
    return response.data;
};

export const checkPaymentStatus = async (checkoutRequestId) => {
    const response = await axiosInstance.get(
        `/payments/status/${checkoutRequestId}`
    );
    return response.data;
};
