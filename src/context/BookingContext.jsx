import React, { createContext, useState, useEffect } from "react";
import { useSocket } from "./SocketContext";
import { triggerStkPush } from "../api/payment";
import { useAuth } from "./AuthContext";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const socket = useSocket();
  const { user } = useAuth(); // We need user to join the right room

  // Listen for payment updates via Socket
  useEffect(() => {
    if (!socket || !user) return;

    // Join the user-specific room to receive personal payment notifications
    // ensure backend expects 'join_user' event
    socket.emit('join_user', { user_id: user.id });

    const handlePaymentReceived = (data) => {
      console.log("BookingContext: Payment Received via Socket", data);
      if (currentBooking && currentBooking.id === data.booking_id) {
        setCurrentBooking(prev => ({ ...prev, payment_status: 'completed', ...data }));
        // Alert handled by Dashboard Modal
      }
    };

    socket.on('payment_received', handlePaymentReceived);

    return () => {
      socket.off('payment_received', handlePaymentReceived);
    };
  }, [socket, user, currentBooking]);

  const processPayment = async (phoneNumber) => {
    if (!currentBooking) {
      setError("No active booking to pay for.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        phone_number: phoneNumber,
        amount: currentBooking.amount,
        booking_id: currentBooking.id
      };

      const response = await triggerStkPush(payload);

      if (response.status === 200 || response.data?.status === 'success') {
        // Success - wait for callback via socket
        console.log("STK Push Initiated:", response.data);
        alert("STK Push Sent! Check your phone.");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      // Fallback to err.message if response is missing (e.g. timeout/network error)
      const errorMsg = err.response?.data?.message || err.message || "Payment initiation failed.";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        setCurrentBooking, // Expose this so components can set the active booking
        processPayment,
        loading,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
