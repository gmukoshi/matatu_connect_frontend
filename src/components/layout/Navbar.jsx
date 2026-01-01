import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Matatu Connect</h1>
      <nav className="flex gap-4">
        {role === "driver" && <Link to="/driver-dashboard">Driver Dashboard</Link>}
        {role === "commuter" && <Link to="/commuter-dashboard">Commuter Dashboard</Link>}
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Navbar;
