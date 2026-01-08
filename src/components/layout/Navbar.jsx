import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `transition ${
      pathname === path
        ? "text-primary font-semibold"
        : "text-text-muted hover:text-text-main"
    }`;

  return (
    <header className="w-full bg-surface border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 font-bold text-lg text-text-main"
        >
          <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-black shadow-glow">
            🚍
          </span>
          Matatu Connect
        </Link>

        {/* NAV */}
        <nav className="flex items-center gap-8 text-sm">
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
          <Link to="/login" className={linkClass("/login")}>
            Login
          </Link>
          <Link to="/commuter-signup" className={linkClass("/commuter-signup")}>
            Commuter
          </Link>
          <Link to="/driver-signup" className={linkClass("/driver-signup")}>
            Driver
          </Link>

          {/* CTA */}
          <Link
            to="/commuter-signup"
            className="ml-4 bg-primary text-black px-5 py-2 rounded-xl font-semibold hover:bg-primary-hover transition shadow-glow"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
