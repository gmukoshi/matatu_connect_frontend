import { fetchMatatus } from "../api/matatus"; // Moved to top
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
    const loadVehicles = async () => {
      try {
        const response = await fetchMatatus();
        const apiVehicles = response.data.data || [];

        // Transform API data to match frontend structure if needed
        // Backend returns: { id, plate_number, driver (name), latitude, longitude, ... }
        // Frontend expects: { id, name, driverName, lat, lng, ... }
        const mappedVehicles = apiVehicles.map(v => ({
          id: v.id,
          name: v.plate_number, // Use plate as name
          driverName: v.driver,
          driverId: v.driver_id, // Ensure this exists if backend sends it. Wait, backend to_dict sends 'driver' name, not ID.
          // We might need driver ID for DriverDashboard filtering: "v.driverId === driverId"
          // Let's check backend to_dict again. It sends 'driver' (name). It does NOT send driver_id explicitly in to_dict Step 353.
          // I should update backend to send driver_id too.
          lat: v.latitude || -1.2921,
          lng: v.longitude || 36.8219,
          status: "available",
          passengerCapacity: v.capacity,
          rating: 4.5
        }));

        if (mappedVehicles.length > 0) {
          setVehicles(mappedVehicles);
        } else {
          console.warn("No vehicles found in API, using fallback");
          setVehicles(fallbackVehicles);
        }
      } catch (err) {
        console.error("Failed to fetch vehicles:", err);
        setVehicles(fallbackVehicles);
      }
    };

    loadVehicles();

    // Animation interval (optional, keeps existing logic for fallbacks, but for real static data it will just stay put)
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
