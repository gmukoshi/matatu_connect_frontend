import React, { useState, useEffect } from "react";
import { Plus, Map as MapIcon } from "lucide-react";
import { fetchRoutes, createRoute } from "../api/routes";
import Modal from "../components/common/Modal";

export default function ManageRoutesPage() {
    const [routes, setRoutes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [routeForm, setRouteForm] = useState({
        origin: "",
        destination: "",
        fare: 50,
        distance: 10,
        estimated_duration: "30 mins"
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await fetchRoutes();
            setRoutes(res.data.data || []);
        } catch (err) {
            console.error("Failed to load routes", err);
        }
    };

    const handleAddRoute = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await createRoute(routeForm);
            alert("Route Created Successfully!");
            setShowModal(false);
            setRouteForm({ origin: "", destination: "", fare: 50, distance: 10, estimated_duration: "30 mins" });
            loadData();
        } catch (err) {
            console.error("Failed to add route:", err);
            alert("Failed to add route: " + (err.response?.data?.error || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Route Management</h1>
                    <p className="text-text-muted">Optimize routes and track revenue.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="mc-btn-primary flex items-center gap-2"
                >
                    <Plus size={20} /> New Route
                </button>
            </div>

            <div className="grid gap-4">
                {routes.map((route) => (
                    <div key={route.id} className="mc-card p-6 flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-6">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                                {route.id}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                                    {route.name || `${route.origin} - ${route.destination}`}
                                </h3>
                                <p className="text-sm text-text-muted">
                                    {route.origin} to {route.destination} • {route.estimated_duration}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-text-muted">Fare</p>
                            <p className="text-xl font-bold text-white">KES {route.fare}</p>
                        </div>
                    </div>
                ))}
                {routes.length === 0 && (
                    <div className="py-12 text-center text-text-muted bg-surface-dark rounded-xl border border-dashed border-white/10">
                        <MapIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No routes defined yet.</p>
                    </div>
                )}
            </div>

            {/* ADD ROUTE MODAL */}
            {showModal && (
                <Modal title="Create New Route" onClose={() => setShowModal(false)}>
                    <form onSubmit={handleAddRoute} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mc-label">Origin</label>
                                <input className="mc-input" value={routeForm.origin} onChange={e => setRouteForm({ ...routeForm, origin: e.target.value })} placeholder="e.g. Westlands" required />
                            </div>
                            <div>
                                <label className="mc-label">Destination</label>
                                <input className="mc-input" value={routeForm.destination} onChange={e => setRouteForm({ ...routeForm, destination: e.target.value })} placeholder="e.g. CBD" required />
                            </div>
                        </div>
                        <div>
                            <label className="mc-label">Fare (KES)</label>
                            <input type="number" className="mc-input" value={routeForm.fare} onChange={e => setRouteForm({ ...routeForm, fare: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mc-label">Distance (km)</label>
                                <input type="number" className="mc-input" value={routeForm.distance} onChange={e => setRouteForm({ ...routeForm, distance: e.target.value })} required />
                            </div>
                            <div>
                                <label className="mc-label">Est. Duration</label>
                                <input className="mc-input" value={routeForm.estimated_duration} onChange={e => setRouteForm({ ...routeForm, estimated_duration: e.target.value })} required />
                            </div>
                        </div>
                        <button disabled={isSubmitting} className="mc-btn-primary w-full mt-4">
                            {isSubmitting ? "Creating..." : "Create Route"}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}
