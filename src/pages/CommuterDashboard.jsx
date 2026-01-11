import React, { useState, useMemo } from "react";
import LiveMap from "../components/map/LiveMap";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import SeatSelector from "../components/seats/SeatSelector";
import { LogOut } from "lucide-react";

const CommuterDashboard = () => {
  const { vehicles, bookingRequests } = useApp();
  const { user, logout } = useAuth(); // Get user and logout function
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
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Good Afternoon, {user?.name?.split(" ")[0] || "Commuter"} 👋
          </h1>
          <p className="text-text-muted mt-1">
            Track matatus and book rides in real-time
          </p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors text-sm font-medium border border-red-500/20"
        >
          <LogOut size={16} />
          Logout
        </button>
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
            className={`p-4 rounded-2xl border transition text-left relative overflow-hidden group
              ${selectedVehicle?.id === v.id
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-surface-dark hover:bg-white/5"
              }
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-white text-lg">{v.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/5">
                    {v.routeName || "Unknown route"}
                  </span>
                </div>
              </div>

              {/* Driver Image */}
              <div className="relative">
                <img
                  src={v.driverImage || `https://ui-avatars.com/api/?name=${v.driverName}&background=random`}
                  alt={v.driverName}
                  className="w-10 h-10 rounded-full border-2 border-surface object-cover shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-surface-dark rounded-full px-1 py-0.5 border border-white/10 flex items-center gap-0.5">
                  <svg className="w-2.5 h-2.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[10px] font-bold text-white">{v.rating || "4.5"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-text-muted">
                Driver: <span className="text-slate-300">{v.driverName || "Unknown"}</span>
              </div>
              <p className="text-xs font-semibold text-primary group-hover:underline">
                Select Vehicle →
              </p>
            </div>
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
