import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react"; // Import icon
import { fetchMatatus, addVehicle } from "../api/matatus"; // Create/Ensure fetchMatatus exists
import { fetchRoutes } from "../api/routes";
import { fetchDrivers } from "../api/users";
import Modal from "../components/common/Modal";

export default function FleetPage() {
    const [vehicles, setVehicles] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [availableDrivers, setAvailableDrivers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [vehicleForm, setVehicleForm] = useState({
        plate_number: "",
        capacity: 14,
        route_id: "",
        driver_id: "",
        sacco_id: 1
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            // vehicles
            const resVehicles = await fetchMatatus(); // Ensure this API exists/works
            setVehicles(resVehicles.data.data || []);

            // routes
            const resRoutes = await fetchRoutes();
            setRoutes(resRoutes.data.data || []);

            // drivers
            const resDrivers = await fetchDrivers();
            const driverData = Array.isArray(resDrivers.data) ? resDrivers.data : (resDrivers.data.data || []);
            setAvailableDrivers(driverData);
        } catch (err) {
            console.error("Error loading fleet data", err);
        }
    };

    const handleAddVehicle = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!vehicleForm.plate_number) throw new Error("Plate number required");

            const payload = {
                ...vehicleForm,
                route_id: vehicleForm.route_id ? parseInt(vehicleForm.route_id) : null,
                driver_id: vehicleForm.driver_id ? parseInt(vehicleForm.driver_id) : null,
            };

            await addVehicle(payload);
            alert("Vehicle Added Successfully!");
            setShowModal(false);
            setVehicleForm({ ...vehicleForm, plate_number: "", driver_id: "", route_id: "" });
            loadData();
        } catch (err) {
            console.error("Failed to add vehicle:", err);
            alert("Failed to add vehicle: " + (err.response?.data?.error || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Fleet Management</h1>
                    <p className="text-text-muted">Manage your vehicles and their status.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="mc-btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> Add Vehicle
                </button>
            </div>

            <div className="bg-surface-dark rounded-2xl p-6 shadow-lg">
                <table className="w-full text-left text-sm text-text-muted">
                    <thead className="border-b border-white/10 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="py-4">Number Plate</th>
                            <th className="py-4">Capacity</th>
                            <th className="py-4">Route</th>
                            <th className="py-4">Status</th>
                            <th className="py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-4 font-medium text-white">{vehicle.plate_number}</td>
                                <td className="py-4">{vehicle.capacity}</td>
                                <td className="py-4">{vehicle.route ? (vehicle.route.name || `${vehicle.route.origin}-${vehicle.route.destination}`) : "Unassigned"}</td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${vehicle.assignment_status === "active"
                                        ? "bg-emerald-500/10 text-emerald-400"
                                        : "bg-yellow-500/10 text-yellow-500"
                                        }`}>
                                        {vehicle.assignment_status || "Active"}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <button className="text-primary hover:text-emerald-300 text-xs font-semibold">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD VEHICLE MODAL */}
            {showModal && (
                <Modal title="Register New Vehicle" onClose={() => setShowModal(false)}>
                    <form onSubmit={handleAddVehicle} className="space-y-4">
                        <div>
                            <label className="mc-label">Plate Number</label>
                            <input
                                className="mc-input uppercase"
                                placeholder="KAA 123B"
                                value={vehicleForm.plate_number}
                                onChange={e => setVehicleForm({ ...vehicleForm, plate_number: e.target.value.toUpperCase() })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mc-label">Capacity</label>
                                <input
                                    type="number"
                                    className="mc-input"
                                    value={vehicleForm.capacity}
                                    onChange={e => setVehicleForm({ ...vehicleForm, capacity: parseInt(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="mc-label">Route</label>
                                <select
                                    className="mc-input bg-slate-900 appearance-none"
                                    value={vehicleForm.route_id}
                                    onChange={e => setVehicleForm({ ...vehicleForm, route_id: e.target.value })}
                                >
                                    <option value="">-- Select Route --</option>
                                    {routes.map(r => (
                                        <option key={r.id} value={r.id}>{r.name || r.origin + " - " + r.destination}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="mc-label">Driver (Optional)</label>
                            <select
                                className="mc-input bg-slate-900 appearance-none"
                                value={vehicleForm.driver_id}
                                onChange={e => setVehicleForm({ ...vehicleForm, driver_id: e.target.value })}
                            >
                                <option value="">-- Assign Driver --</option>
                                {availableDrivers.map(d => (
                                    <option key={d.id} value={d.id}>{d.name} ({d.email})</option>
                                ))}
                            </select>
                        </div>
                        <button disabled={isSubmitting} className="mc-btn-primary w-full mt-4">
                            {isSubmitting ? "Registering..." : "Register Vehicle"}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
