import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      commuterName: "Jane Doe",
      vehicleName: "Matatu A",
      status: "pending",
      pickup: { lat: -1.2921, lng: 36.8219 },
      dropoff: { lat: -1.2935, lng: 36.8235 },
      seats: 2,
    },
  ]);

  const fallbackVehicles = [
    {
      id: 1,
      name: "Matatu A",
      status: "available",
      passengerCapacity: 14,
      driverId: 101,
      driverName: "John Kamau",
      driverImage: "https://i.pravatar.cc/150?img=11",
      rating: 4.8,
      routeName: "Route 1",
      route: [
        { lat: -1.2921, lng: 36.8219 },
        { lat: -1.2925, lng: 36.8225 },
        { lat: -1.293, lng: 36.823 },
        { lat: -1.2935, lng: 36.8235 },
      ],
      lat: -1.2921,
      lng: 36.8219,
      _posIndex: 0,
    },
    {
      id: 2,
      name: "Matatu B",
      status: "busy",
      passengerCapacity: 12,
      driverId: 102,
      driverName: "Peter Omondi",
      driverImage: "https://i.pravatar.cc/150?img=3",
      rating: 4.5,
      routeName: "Route 1",
      route: [
        { lat: -1.2922, lng: 36.822 },
        { lat: -1.2927, lng: 36.8227 },
        { lat: -1.2932, lng: 36.8232 },
        { lat: -1.2937, lng: 36.8237 },
      ],
      lat: -1.2922,
      lng: 36.822,
      _posIndex: 0,
    },
    {
      id: 3,
      name: "Matatu C",
      status: "available",
      passengerCapacity: 16,
      driverId: 103,
      driverName: "Samuel Njoroge",
      driverImage: "https://i.pravatar.cc/150?img=59",
      rating: 4.9,
      routeName: "Route 2",
      route: [
        { lat: -1.291, lng: 36.82 },
        { lat: -1.2915, lng: 36.821 },
        { lat: -1.292, lng: 36.822 },
        { lat: -1.2925, lng: 36.823 },
      ],
      lat: -1.291,
      lng: 36.82,
      _posIndex: 0,
    },
  ];

  useEffect(() => {
    setVehicles(fallbackVehicles);

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          if (!v.route || v.route.length < 2) return v;
          const nextIndex = (v._posIndex + 1) % v.route.length;
          return {
            ...v,
            lat: v.route[nextIndex].lat,
            lng: v.route[nextIndex].lng,
            _posIndex: nextIndex,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const respondToBooking = (id, status) => {
    setBookingRequests((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <AppContext.Provider value={{ vehicles, bookingRequests, respondToBooking }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
