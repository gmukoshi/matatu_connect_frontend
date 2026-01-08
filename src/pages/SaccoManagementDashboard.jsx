import React from "react";

export default function SaccoManagementDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Sacco Overview
        </h1>
        <p className="text-text-muted">
          Monitor fleet performance and operations.
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat title="Total Vehicles" value="50" />
        <Stat title="Active Drivers" value="38" />
        <Stat title="Routes" value="12" />
        <Stat title="Revenue Today" value="KES 180,000" highlight />
      </div>

      {/* TABLE */}
      <div className="bg-surface-dark rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Active Drivers
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-text-muted">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left py-3">Driver</th>
                <th className="text-left py-3">Vehicle</th>
                <th className="text-left py-3">Route</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              <Row
                name="John Kamau"
                plate="KBC 455T"
                route="Route 44"
                status="Active"
              />
              <Row
                name="Sarah Omondi"
                plate="KDA 892L"
                route="Route 11"
                status="Idle"
              />
              <Row
                name="David K."
                plate="KAZ 771M"
                route="Route 23"
                status="Active"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== */
/* SMALL COMPONENTS */
/* ===================== */

function Stat({ title, value, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 shadow-md ${
        highlight
          ? "bg-primary text-black"
          : "bg-surface-dark text-white"
      }`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function Row({ name, plate, route, status }) {
  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="py-3 text-white">{name}</td>
      <td>{plate}</td>
      <td>{route}</td>
      <td>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Active"
              ? "bg-primary/20 text-primary"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
}
