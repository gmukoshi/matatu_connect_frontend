import matatuIcon from "../assets/Matatu_icon.png";

export default function LandingPage() {
  return (
    <main className="bg-[#0b0f0e] text-gray-200">
      <Hero />
      <Features />
      <CtaSection />
      <Footer />
    </main>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <p className="text-emerald-400 font-semibold mb-4 uppercase tracking-wide">
          Live tracking
        </p>

        <h1 className="text-6xl font-extrabold leading-tight mb-6 text-white">
          Track & Book <br /> Matatus in Real-Time
        </h1>

        <p className="text-gray-400 text-lg mb-10">
          Navigate the city with confidence. Cashless payments, live route
          updates, and safer rides right from your pocket.
        </p>

        <div className="flex items-center gap-8">
          <button className="btn-primary">
            Get Started
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            <span>Easy onboarding</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1514] rounded-3xl h-80 flex flex-col items-center justify-center border border-white/10 text-gray-400">
        <span className="text-sm uppercase tracking-wide mb-2">
          Live Map Preview
        </span>
        <span className="text-xs">
          Real-time matatu tracking
        </span>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */

function Features() {
  return (
    <section id="features" className="bg-[#0f1514] py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Why Choose Matatu Connect?
        </h2>

        <p className="text-gray-400 mb-16 max-w-2xl text-lg">
          Experience the future of public transport in Kenya with features
          designed for safety and convenience.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard title="Live Tracking" />
          <FeatureCard title="M-Pesa Integrated" />
          <FeatureCard title="Safe Rides" />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title }) {
  return (
    <div className="card">
      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl mb-6" />
      <h3 className="text-xl font-semibold mb-3 text-white">
        {title}
      </h3>
      <p className="text-gray-400">
        Built for speed, safety and reliability.
      </p>
    </div>
  );
}

/* ---------------- CTA ---------------- */

function CtaSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-28 text-center text-black">
      <h2 className="text-4xl font-bold mb-4">
        Ready to upgrade your commute?
      </h2>

      <p className="opacity-80 mb-10 max-w-xl mx-auto text-lg">
        Smarter, safer, cashless matatu rides.
      </p>

      <button className="bg-black text-white px-10 py-4 rounded-lg font-medium hover:bg-black/80 transition shadow-lg">
        Get started
      </button>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0f0e]">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2 font-semibold text-white">
          <img src={matatuIcon} alt="Matatu Connect" className="w-5 h-5" />
          Matatu Connect
        </div>

        <div className="flex gap-6 flex-wrap">
          <a href="#home" className="hover:text-white">Home</a>
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#privacy" className="hover:text-white">Privacy</a>
          <a href="#terms" className="hover:text-white">Terms</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © 2025 Matatu Connect. All rights reserved.
      </div>
    </footer>
  );
}
