export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface-dark rounded-3xl p-8 shadow-2xl border border-white/10">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center text-xl shadow-glow">
            🚍
          </div>

          <h1 className="text-2xl font-bold text-text-main">
            {title}
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
