import React, { useState } from "react";
import "../index.css";
import matatuIcon from "../assets/Matatu_icon.png";

export default function DriverSignup() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [licence, setLicence] = useState("");
  const [plate, setPlate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, secondName, licence, plate, email, password });
  };

  return (
    <main className="page">
      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={matatuIcon} alt="Matatu Connect" width="26" height="26" />
          <span>Matatu Connect</span>
        </div>
        <button type="button">Help</button>
      </header>

      <section className="layout">
        {/* LEFT */}
        <section>
          <h1>Create your Account</h1>
          <p>Ride smarter across Kenya. Join the community today.</p>

          <div className="row2">
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <hr />

          <form onSubmit={handleSubmit}>
            <div className="row2">
              <label>
                Driver Firstname
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                />
              </label>

              <label>
                Driver second name
                <input
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  placeholder="Doe"
                />
              </label>
            </div>

            <div className="row2">
              <label>
                Driver's licence
                <input
                  value={licence}
                  onChange={(e) => setLicence(e.target.value)}
                  placeholder="XXXXXXX"
                />
              </label>

              <label>
                Vehicle number plate
                <input
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="KXXX XXX"
                />
              </label>
            </div>

            <label>
              Email Address
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </label>

            <button type="submit" className="cta">
              Sign Up
            </button>

            <p style={{ marginTop: 12 }}>
              Already have an account? <button type="button">Log In</button>
            </p>
          </form>
        </section>

        {/* RIGHT */}
        <aside className="right">
          <div>Icon</div>
          <div>
            <h2>Live Tracking & Real-time Updates</h2>
            <p>
              Never miss your ride again. Track your matatu in real-time and
              plan your journey with confidence.
            </p>
          </div>
          <div className="dots">
            <span />
            <span />
            <span />
          </div>
        </aside>
      </section>
    </main>
  );
}
