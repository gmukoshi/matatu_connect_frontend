import React, { useState, useEffect } from "react";
import { fetchDrivers, inviteDriver } from "../api/users"; // You'll need to export registerUser from here or import from api/auth
import { registerUser } from "../api/auth";
import { Plus, Search, User, Mail, Phone, MoreVertical } from "lucide-react";

export default function DriversPage() {
    const [drivers, setDrivers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState("invite"); // 'invite' or 'create'
    const [inviteEmail, setInviteEmail] = useState("");
    const [newDriverForm, setNewDriverForm] = useState({ name: "", email: "", password: "", role: "driver" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        try {
            const res = await fetchDrivers();
            // Ensure array
            const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
            setDrivers(data);
        } catch (err) {
            console.error("Failed to load drivers", err);
        }
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await inviteDriver(inviteEmail);
            alert("Driver added to Sacco successfully!");
            setInviteEmail("");
            setShowModal(false);
            loadDrivers();
        } catch (err) {
            alert("Failed to invite: " + (err.response?.data?.error || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await registerUser({ ...newDriverForm, role: "driver" });
            alert("New Driver Created Successfully!");
            setNewDriverForm({ name: "", email: "", password: "", role: "driver" });
            setShowModal(false);
            loadDrivers();
        } catch (err) {
            alert("Failed to create: " + (err.response?.data?.error || err.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Drivers</h1>
                    <p className="text-text-muted">Manage your fleet drivers ({drivers.length})</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors"
                >
                    <Plus size={20} /> Add Driver
                </button>
            </div>

            {/* Drivers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver.id} className="mc-card p-6 flex flex-col gap-4 relative group">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-white/10 rounded"><MoreVertical size={16} className="text-text-muted" /></button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-surface border border-white/10 flex items-center justify-center text-xl font-bold text-emerald-400">
                                {driver.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{driver.name}</h3>
                                <div className="flex items-center gap-1 text-xs text-text-muted">
                                    <span className="text-emerald-400">Active</span> • ID: {driver.id}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-3 text-sm text-text-muted p-2 bg-white/5 rounded-lg">
                                <Mail size={16} />
                                <span className="truncate">{driver.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-text-muted p-2 bg-white/5 rounded-lg">
                                <Phone size={16} />
                                <span>No phone linked</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex gap-2">
                            <button className="flex-1 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}

                {drivers.length === 0 && (
                    <div className="col-span-full py-12 text-center text-text-muted bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <User size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No drivers found in your Sacco.</p>
                        <button onClick={() => setShowModal(true)} className="text-emerald-400 hover:underline mt-2">Add your first driver</button>
                    </div>
                )}
            </div>

            {/* ADD DRIVER MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="mc-card w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Add Driver</h2>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-white">✕</button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10">
                            <button
                                onClick={() => setActiveTab('invite')}
                                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'invite' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-white/5' : 'text-text-muted hover:text-white'}`}
                            >
                                Existing Account
                            </button>
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'create' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-white/5' : 'text-text-muted hover:text-white'}`}
                            >
                                Register New
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {activeTab === 'invite' ? (
                                <form onSubmit={handleInvite} className="space-y-4">
                                    <p className="text-sm text-text-muted">
                                        Enter the email of an existing driver on Matatu Connect to add them to your Sacco.
                                    </p>
                                    <div>
                                        <label className="mc-label">Driver Email</label>
                                        <input
                                            type="email"
                                            required
                                            className="mc-input"
                                            placeholder="driver@example.com"
                                            value={inviteEmail}
                                            onChange={e => setInviteEmail(e.target.value)}
                                        />
                                    </div>
                                    <button disabled={isSubmitting} className="mc-btn-primary w-full py-3">
                                        {isSubmitting ? "Inviting..." : "Add to Sacco"}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleCreate} className="space-y-4">
                                    <div>
                                        <label className="mc-label">Full Name</label>
                                        <input
                                            required
                                            className="mc-input"
                                            placeholder="John Doe"
                                            value={newDriverForm.name}
                                            onChange={e => setNewDriverForm({ ...newDriverForm, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="mc-label">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="mc-input"
                                            placeholder="john@example.com"
                                            value={newDriverForm.email}
                                            onChange={e => setNewDriverForm({ ...newDriverForm, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="mc-label">Password</label>
                                        <input
                                            type="password"
                                            required
                                            className="mc-input"
                                            placeholder="••••••••"
                                            value={newDriverForm.password}
                                            onChange={e => setNewDriverForm({ ...newDriverForm, password: e.target.value })}
                                        />
                                    </div>
                                    <button disabled={isSubmitting} className="mc-btn-primary w-full py-3">
                                        {isSubmitting ? "Creating..." : "Create & Add Driver"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
