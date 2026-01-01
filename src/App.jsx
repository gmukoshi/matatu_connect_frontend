// import LoginPage from "./pages/LoginPage.jsx";
// import Commutersignup from "./pages/Commutersignup.jsx";
// import ManagerSignup from  "./pages/ManagerSignup.jsx";
// import DriverSignup from "./pages/DriverSignup.jsx";
// import AdminDashboard from "./pages/AdminLogin.jsx";
// import Homepage from "./pages/Homepage.jsx"
// import {Routes, Route} from "react-router-dom";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import DashboardOverview from "./pages/SaccoManagementDashboard.jsx";

// function App() {
//   return (
//   <Routes>
  
//   < Route path="/admin" element={<AdminLogin />}  />
//   < Route LoginPage path="/Login-Page" element={<LoginPage />} />
//   < Route Commutersignup path= "/Commuter-signup" element={<Commutersignup />} />
//   < Route ManagerSignup path="/Manager-Signup" element={< ManagerSignup/> }/>
//   < Route DriverSignup path="/Driver-Signup" element={<DriverSignup />} />
//   < Route Homepage path="/" element={<Homepage />} />
//   < Route DashboardOverview path="/Dashboard-overview" element={<DashboardOverview />} />
//   </Routes>
// );}

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Pages
import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CommuterDashboard from "./pages/CommuterDashboard.jsx";
import DriverDashboard from "./pages/DriverDashboard.jsx";
import Commutersignup from "./pages/Commutersignup.jsx";
import ManagerSignup from "./pages/ManagerSignup.jsx";
import DriverSignup from "./pages/DriverSignup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import DashboardOverview from "./pages/SaccoManagementDashboard.jsx";

function App() {
  return (
    <AppProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/commuter-signup" element={<Commutersignup />} />
        <Route path="/manager-signup" element={<ManagerSignup />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Dashboards */}
        <Route path="/dashboard-overview" element={<DashboardOverview />} />
        <Route path="/driver" element={<DriverDashboard driverId={101} />} />
        <Route path="/commuter" element={<CommuterDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<h1>404 – Page Not Found</h1>} />
      </Routes>
    </AppProvider>
  );
}

export default App;
