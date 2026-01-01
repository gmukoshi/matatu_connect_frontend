import React, { useState, useMemo } from "react";
import LiveMap from "../components/map/LiveMap";
import { useApp } from "../context/AppContext";
import MainLayout from "../components/layout/MainLayout";

const DriverDashboard = () => {
  const { vehicles, bookingRequests, respondToBooking } = useApp();
  const [online, setOnline] = useState(false);

  const toggleOnline = () => setOnline(!online);

  const driverId = 101; // match your mock data
  const myVehicle = vehicles.find((v) => v.driverId === driverId);

  const filteredVehicles = useMemo(() => {
    if (!myVehicle) return [];
    return vehicles.filter(
      (v) => v.routeName === myVehicle.routeName && v.id !== myVehicle.id
    );
  }, [vehicles, myVehicle]);

  return (
    <MainLayout role="driver">
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>
      <button
        onClick={toggleOnline}
        className={`px-4 py-2 mb-4 rounded text-white ${
          online ? "bg-green-600" : "bg-gray-500"
        }`}
      >
        {online ? "Go Offline" : "Go Online"}
      </button>

      {myVehicle && (
        <div className="map-container mb-6">
          <LiveMap
            vehicles={[myVehicle, ...filteredVehicles].map((v) => ({
              ...v,
              lat: Number(v.lat),
              lng: Number(v.lng),
              route: Array.isArray(v.route)
                ? v.route.map((p) => ({ lat: Number(p.lat), lng: Number(p.lng) }))
                : [],
            }))}
            centerVehicle={myVehicle}
          />
        </div>
      )}

      {myVehicle && (
        <div className="mt-4 p-4 border rounded shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Your Vehicle</h3>
          <p><strong>Name:</strong> {myVehicle.name}</p>
          <p><strong>Status:</strong> {myVehicle.status}</p>
          <p><strong>Seats Available:</strong> {myVehicle.passengerCapacity}</p>
          {myVehicle.routeName && <p><strong>Route:</strong> {myVehicle.routeName}</p>}
        </div>
      )}

      {bookingRequests.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Live Booking Requests</h3>
          <ul className="space-y-1">
            {bookingRequests.map((b) => (
              <li key={b.id} className="border p-2 rounded shadow-sm">
                <p><strong>Commuter:</strong> {b.commuterName}</p>
                <p><strong>Status:</strong> {b.status}</p>
                {b.status === "pending" && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => respondToBooking(b.id, "accepted")}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => respondToBooking(b.id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </MainLayout>
  );
};

export default DriverDashboard;
