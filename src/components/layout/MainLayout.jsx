import React from "react";
import Sidebar from "./Sidebar.jsx";

const MainLayout = ({ children, role }) => {
  return (
    <div className="flex h-screen bg-background text-text-main">
      {/* SIDEBAR */}
      <Sidebar role={role} />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
