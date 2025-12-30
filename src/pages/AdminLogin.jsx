import React, { useState } from "react";
import "../index.css";
import matatuIcon from "../assets/Matatu_icon.png";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ username, password });
  };

  return (
    <main className="page">
      <section className="card">
        <p className="top">Admin Dashboard</p>

        <div className="brand">
          <img src={matatuIcon} alt="Matatu Connect" width="36" height="36" />
        </div>

        <h1>Matatu Connect</h1>
        <p className="sub">Welcome Back, please login to continue</p>

        <div className="pill">
          <span>Admin Login</span>
        </div>

        <form onSubmit={handleLogin}>
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="John Doe"
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <div className="row">
            <span />
            <button type="button" className="link">
              Forgot Password? <br />
              Contact administrators
            </button>
          </div>

          <button className="cta" type="submit">
            Log In →
          </button>
        </form>
      </section>
    </main>
  );
}
export default AdminLogin; 