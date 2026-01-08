import React, { useState, useMemo } from "react";
import LiveMap from "../components/map/LiveMap";
import { useApp } from "../context/AppContext";

const DriverDashboard = () => {
  const { vehicles, bookingRequests, respondToBooking } = useApp();
  const [online, setOnline] = useState(true);

  const driverId = 101;
  const myVehicle = vehicles.find((v) => v.driverId === driverId);

  const nearbyVehicles = useMemo(() => {
    if (!myVehicle) return [];
    return vehicles.filter(
      (v) => v.routeName === myVehicle.routeName && v.id !== myVehicle.id
    );
  }, [vehicles, myVehicle]);

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Habari, Driver 👋
          </h1>
          <p className="text-text-muted">Ready for the next trip?</p>
        </div>

        <button
          onClick={() => setOnline(!online)}
          className="bg-primary text-black px-6 py-3 rounded-full font-semibold"
        >
          {online ? "You’re Online" : "Go Online"}
        </button>
      </div>

      {/* MAP */}
      {myVehicle && (
        <div className="bg-surface-dark rounded-2xl p-4 mb-8">
          <LiveMap
            vehicles={[myVehicle, ...nearbyVehicles]}
            centerVehicle={myVehicle}
          />
        </div>
      )}

      {/* BOOKINGS */}
      <div className="bg-surface-dark rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Booking Requests
        </h3>

        {bookingRequests.map((b) => (
          <div key={b.id} className="mb-4">
            <p className="text-white">{b.commuterName}</p>
            <p className="text-text-muted">{b.status}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DriverDashboard;
