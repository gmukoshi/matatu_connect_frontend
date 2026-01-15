import axiosInstance from './apiClient';

/**
 * Trigger an M-Pesa STK Push
 * @param {Object} data - Payment data
 * @param {string} data.phone_number - Customer phone (e.g., 0712345678)
 * @param {number} data.amount - Amount to charge
 * @param {number} data.booking_id - Related booking ID
 * @returns {Promise} Axios response
 */
export const triggerStkPush = (data) => {
    console.log("DEBUG: Current Axios Timeout config:", axiosInstance.defaults.timeout);
    // Explicitly override timeout for this request to 120 seconds
    return axiosInstance.post('/payments/stk-push', data, { timeout: 120000 });
};
