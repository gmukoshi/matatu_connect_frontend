import React, { useState, useMemo } from "react";
import LiveMap from "../components/map/LiveMap";
import { useApp } from "../context/AppContext";
import { Clock, MapPin, Navigation, Phone, Search, Users, Wallet } from "lucide-react";

const DriverDashboard = () => {
  const { vehicles } = useApp();
  const [online, setOnline] = useState(true);

  // Mock data to match screenshot
  const driverId = 101;
  const myVehicle = vehicles.find((v) => v.driverId === driverId) || vehicles[0];

  const upcomingPickups = [
    { id: 1, name: "Mercy Wanjiku", location: "Westlands Stage", time: "2 min away", type: "next", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: 2, name: "Brian Kamau", location: "Sarit Center Main Gate", time: "5 min", type: "upcoming", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: 3, name: "Sarah Njoroge", location: "ABC Place", time: "12 min", type: "upcoming", avatar: "https://i.pravatar.cc/150?img=9" },
    { id: 4, name: "David Ochieng", location: "Kangemi Flyover", time: "18 min", type: "upcoming", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Habari, John! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-text-muted mt-1">Ready for the afternoon rush?</p>
        </div>

        <div className={`
          flex items-center gap-3 px-4 py-2 rounded-full border transition-all cursor-pointer
          ${online ? "bg-emerald-500/10 border-emerald-500/50" : "bg-surface border-white/10"}
        `} onClick={() => setOnline(!online)}>
          <div className={`w-10 h-6 rounded-full relative transition-colors ${online ? "bg-emerald-500" : "bg-slate-600"}`}>
            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${online ? "translate-x-4" : ""}`} />
          </div>
          <div className="text-sm">
            <p className={`font-bold ${online ? "text-emerald-400" : "text-slate-400"}`}>
              {online ? "You are Online" : "You are Offline"}
            </p>
            <p className="text-[10px] text-text-muted">
              {online ? "Searching for trips..." : "Not visible to passengers"}
            </p>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* EARNINGS CARD (Big Green) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="font-medium opacity-80 mb-1">Today's Earnings</p>
              <h2 className="text-5xl font-bold mb-4">KES4,500</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/10 rounded-full text-xs font-semibold">
                <span>📈 +12% vs yesterday</span>
              </div>
              <span className="text-xs opacity-60 ml-3">Updated 5m ago</span>
            </div>
            <div className="p-3 bg-black/10 rounded-2xl">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* SIDE STATS */}
        <div className="space-y-6">
          <StatCard
            icon={<Clock className="w-5 h-5 text-yellow-400" />}
            label="Hours Online"
            value="6h 12m"
            subtext="Since 6:00 AM"
          />
          <StatCard
            icon={<Navigation className="w-5 h-5 text-emerald-400" />}
            label="Trips Today"
            value="14"
            subtext="2 more to goal"
          />
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* UPCOMING PICKUPS */}
        <div className="bg-surface-dark rounded-3xl p-6 border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Upcoming Pickups</h3>
            <button className="text-emerald-400 text-sm font-semibold hover:underline">View All</button>
          </div>

          <div className="space-y-1">
            {upcomingPickups.map((pickup, idx) => (
              <div key={pickup.id} className={`p-4 rounded-2xl transition-all ${pickup.type === "next"
                  ? "bg-emerald-500/10 border border-emerald-500/20 mb-4"
                  : "hover:bg-white/5 border border-transparent"
                }`}>
                {pickup.type === "next" && (
                  <div className="flex justify-between items-center mb-3 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-emerald-400">Next Stop</span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{pickup.time} away</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={pickup.avatar} alt={pickup.name} className="w-10 h-10 rounded-full object-cover border-2 border-surface" />
                    <div>
                      <p className="font-bold text-white text-sm">{pickup.name}</p>
                      <div className="flex items-center gap-1 text-xs text-text-muted mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {pickup.location}
                      </div>
                    </div>
                  </div>

                  {pickup.type === "next" ? (
                    <button className="bg-emerald-500 text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-400 transition-colors">
                      Arrived
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-text-muted">{pickup.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MAP / ROUTE PREVIEW */}
        <div className="bg-surface-dark rounded-3xl p-6 border border-white/5 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Route Preview</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white"><Search className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="flex-1 relative rounded-2xl overflow-hidden min-h-[300px]">
            {/* Map Component */}
            <LiveMap vehicles={[myVehicle]} centerVehicle={myVehicle} />

            {/* Traffic Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-start gap-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-500">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Heavy Traffic</p>
                <p className="text-xs text-text-muted mt-0.5">Expected delay: +5 mins on Waiyaki Way</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Component for small stat cards
function StatCard({ icon, label, value, subtext }) {
  return (
    <div className="bg-surface-dark rounded-3xl p-5 border border-white/5 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <span className="text-sm text-text-muted font-medium">{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded-lg inline-block">
          {subtext}
        </p>
      </div>
    </div>
  )
}

export default DriverDashboard;
