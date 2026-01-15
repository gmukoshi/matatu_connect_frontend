import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";


console.log("%c MATATU CONNECT APP LOADED 🚀 (v2026.01.15-FIXED)", "background: #00ff00; color: black; font-size: 14px; font-weight: bold;");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
