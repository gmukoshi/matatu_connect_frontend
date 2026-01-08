import React, { useState, useMemo } from "react";
import LiveMap from "../components/map/LiveMap";
import { useApp } from "../context/AppContext";
import SeatSelector from "../components/seats/SeatSelector";

const CommuterDashboard = () => {
  const { vehicles, bookingRequests } = useApp();
  const [routeFilter, setRouteFilter] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) =>
      routeFilter
        ? v.routeName?.toLowerCase().includes(routeFilter.toLowerCase())
        : true
    );
  }, [vehicles, routeFilter]);

  return (
    <>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Good Afternoon 👋
        </h1>
        <p className="text-text-muted mt-1">
          Track matatus and book rides in real-time
        </p>
      </div>

      {/* STATS + FILTER */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <p className="text-sm text-text-muted">Available Vehicles</p>
          <h2 className="text-3xl font-bold text-primary">
            {filteredVehicles.length}
          </h2>
        </div>

        <div className="card">
          <p className="text-sm text-text-muted">Active Routes</p>
          <h2 className="text-3xl font-bold text-primary">
            {[...new Set(filteredVehicles.map(v => v.routeName))].length}
          </h2>
        </div>

        <div className="card">
          <p className="text-sm text-text-muted">Filter by Route</p>
          <input
            value={routeFilter}
            onChange={(e) => setRouteFilter(e.target.value)}
            placeholder="e.g Thika Road"
            className="mt-2 w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* MAP */}
      <div className="bg-surface-dark rounded-2xl p-4 mb-8">
        <LiveMap
          vehicles={filteredVehicles}
          centerVehicle={filteredVehicles[0]}
        />
      </div>

      {/* VEHICLE LIST */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {filteredVehicles.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVehicle(v)}
            className={`p-5 rounded-2xl border transition text-left
              ${
                selectedVehicle?.id === v.id
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-surface-dark hover:bg-white/5"
              }
            `}
          >
            <p className="font-semibold text-white">
              {v.name}
            </p>
            <p className="text-sm text-text-muted">
              {v.routeName || "Unknown route"}
            </p>
            <p className="text-xs mt-2 text-primary">
              Tap to select
            </p>
          </button>
        ))}
      </div>

      {/* SEAT SELECTION */}
      {selectedVehicle && (
        <SeatSelector
          totalSeats={selectedVehicle.totalSeats || 14}
          bookedSeats={selectedVehicle.bookedSeats || [2, 5, 7]}
          onConfirm={(seats) => {
            alert(
              `Seats ${seats.join(", ")} booked on ${selectedVehicle.name}`
            );
          }}
        />
      )}

      {/* BOOKINGS */}
      {bookingRequests.length > 0 && (
        <div className="bg-surface-dark p-6 rounded-2xl mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">
            Your Bookings
          </h3>

          <div className="space-y-3">
            {bookingRequests.map((b) => (
              <div
                key={b.id}
                className="p-4 bg-black/30 rounded-xl border border-white/10"
              >
                <p className="text-white font-medium">
                  {b.vehicleName}
                </p>
                <p className="text-text-muted text-sm">
                  Status: {b.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CommuterDashboard;
