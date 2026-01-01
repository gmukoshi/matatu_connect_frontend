import React from "react";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

const MainLayout = ({ children, role }) => {
  return (
    <div className="flex h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col min-h-0">
        <Navbar />
        <main className="p-4 flex-1 overflow-auto min-h-0">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
