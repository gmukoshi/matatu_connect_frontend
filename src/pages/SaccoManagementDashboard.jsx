import React, { useState } from "react";
import LiveMap from "../components/map/LiveMap";
import {
  Bell,
  ChevronDown,
  Filter,
  Fuel,
  LayoutDashboard,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  Bus
} from "lucide-react";

export default function SaccoManagementDashboard() {
  // Mock Data
  const drivers = [
    { id: "DR-4401", name: "John Kamau", plate: "KBC 455T", route: "Route 44 (Thika Rd)", status: "Active", avatar: "https://i.pravatar.cc/150?img=11" },
    { id: "DR-2105", name: "Sarah Omondi", plate: "KDA 892L", route: "Route 11 (South B)", status: "Idle", avatar: "https://i.pravatar.cc/150?img=5" },
    { id: "DR-3302", name: "David K.", plate: "KAZ 771M", route: "Route 23 (Westlands)", status: "Active", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  // Mock vehicles for map
  const mockVehicles = [
    { id: 1, lat: -1.2921, lng: 36.8219, name: "Matatu A" },
    { id: 2, lat: -1.2821, lng: 36.8119, name: "Matatu B" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* TOP HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search vehicle, driver, or route..."
              className="w-full bg-surface-dark border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-surface-dark border border-white/10 rounded-lg text-white hover:bg-white/5 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface-dark"></span>
            </button>
            <button className="p-2.5 bg-surface-dark border border-white/10 rounded-lg text-white hover:bg-white/5">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="mc-btn-primary flex items-center gap-2 px-4 py-2.5">
              <Plus className="w-4 h-4" /> <span className="hidden sm:inline">New Vehicle</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Revenue"
          value="KES 4.2M"
          subtext="Vs. KES 3.75M last month"
          trend="+12%"
          trendUp={true}
        />
        <StatCard
          label="Active Fleet"
          value="45/50"
          subtext="5 vehicles in maintenance"
          trend="+2%"
          trendUp={true}
        />
        <StatCard
          label="Daily Passengers"
          value="12.4K"
          subtext="Due to heavy rains"
          trend="-5%"
          trendUp={false}
        />
        <StatCard
          label="Fuel Efficiency"
          value="8.5 km/L"
          subtext="Fleet average"
          badge="Stable"
        />
      </div>

      {/* MIDDLE SECTION (Chart + Map) */}
      <div className="grid lg:grid-cols-3 gap-6 h-[400px]">

        {/* REVENUE CHART */}
        <div className="lg:col-span-2 mc-card p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Revenue this Month</h3>
              <p className="text-sm text-text-muted">Comparison with previous period</p>
            </div>
            <button className="text-text-muted hover:text-white"><MoreHorizontal /></button>
          </div>

          {/* Custom SVG Chart */}
          <div className="flex-1 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="225" x2="800" y2="225" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <line x1="0" y1="75" x2="800" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

              {/* The Curve */}
              <path
                d="M0,250 C50,200 100,100 150,150 C200,200 250,250 300,200 C350,150 400,100 450,150 C500,200 550,280 600,250 C650,220 700,50 750,150 L750,300 L0,300 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0,250 C50,200 100,100 150,150 C200,200 250,250 300,200 C350,150 400,100 450,150 C500,200 550,280 600,250 C650,220 700,50 750,150"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data Point */}
              <circle cx="450" cy="150" r="6" fill="#10b981" stroke="white" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-xs text-text-muted mt-2 px-2 uppercase tracking-wide">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* MINI MAP */}
        <div className="mc-card p-0 overflow-hidden relative flex flex-col">
          <div className="absolute top-4 left-4 z-10 flex justify-between w-[calc(100%-32px)] items-center">
            <h3 className="text-sm font-bold text-white bg-black/50 backdrop-blur px-3 py-1 rounded-full">Fleet Distribution</h3>
            <span className="text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded">Live</span>
          </div>
          <div className="flex-1 bg-surface-dark">
            <LiveMap vehicles={mockVehicles} centerVehicle={mockVehicles[0]} />
          </div>
        </div>
      </div>

      {/* DRIVERS TABLE */}
      <div className="mc-card overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Active Drivers</h3>
            <p className="text-sm text-text-muted">Real-time status of on-duty personnel</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white hover:bg-white/5">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white hover:bg-white/5">
              <TrendingDown className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-dark/50 text-xs uppercase text-text-muted font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Driver Name</th>
                <th className="px-6 py-4">Vehicle Plate</th>
                <th className="px-6 py-4">Current Route</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {drivers.map(driver => (
                <tr key={driver.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={driver.avatar} className="w-9 h-9 rounded-full object-cover border border-white/10" alt={driver.name} />
                      <div>
                        <p className="font-semibold text-white">{driver.name}</p>
                        <p className="text-[10px] text-text-muted">ID: {driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white font-mono bg-white/5 rounded mx-2 w-fit inline-block my-3 px-2 py-1 text-xs">
                    {driver.plate}
                  </td>
                  <td className="px-6 py-4 text-text-muted">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-3 h-3 rotate-90" /> {driver.route}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${driver.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${driver.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-500'}`}></span>
                      {driver.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-text-muted hover:text-white p-1 rounded hover:bg-white/10">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Sub-Component for Top Cards
function StatCard({ label, value, subtext, trend, trendUp, badge }) {
  return (
    <div className="mc-card p-5 hover:border-primary/30 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <p className="text-text-muted text-sm font-medium">{label}</p>
        {trend && (
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
        {badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-text-muted">{badge}</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-xs text-text-muted">{subtext}</p>
    </div>
  )
}
