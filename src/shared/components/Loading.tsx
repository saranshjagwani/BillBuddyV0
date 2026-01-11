import { useState, useEffect } from "react";

/**
 * BillBuddyLoading
 *
 * Full-screen branded loading screen.
 *
 * Purpose:
 * - Shown during app initialization / auth checks
 * - Reduces perceived waiting time
 * - Reinforces brand identity and voice-first nature
 *
 * This is a single-purpose component and is intentionally
 * NOT broken into smaller reusable parts.
 */
export default function BillBuddyLoading() {
  /**
   * Entrance animation state
   * - opacity + scale create a soft fade-in
   * - avoids sudden visual jumps on load
   */
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.95);

  useEffect(() => {
    // Trigger fade-in shortly after mount
    setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        // Background uses soft brand surface color
        backgroundColor: "var(--bb-bg-soft)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Background ambience: soft gradient orbs to reduce perceived wait time */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle, var(--bb-secondary) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--bb-primary) 0%, transparent 70%)",
            animation: "pulse 3s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* ------------------------------------------------ */}
      {/* Main content container (brand + messaging)      */}
      {/* ------------------------------------------------ */}
      <div className="relative z-10 text-center">
        {/* ------------------------------- */}
        {/* Brand focus: logo with glow     */}
        {/* ------------------------------- */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Soft glow behind logo to add depth */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40"
              style={{
                backgroundColor: "var(--bb-secondary)",
                animation: "glow 2s ease-in-out infinite",
              }}
            />

            {/* Logo container */}
            <div
              className="relative h-32 w-32 sm:h-36 sm:w-36 flex items-center justify-center shadow-2xl"
              style={{
                borderRadius: "32px",
                backgroundColor: "var(--bb-secondary)",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              <img
                src="/src/assets/logo/BillBuddyLogo2.png"
                alt="BillBuddy Logo"
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
              />

              {/* -------------------------------- */}
              {/* Voice-first signal: mic badge   */}
              {/* -------------------------------- */}
              <div className="absolute -bottom-2 -right-2">
                <div className="relative">
                  {/* Pulse rings to indicate activity */}
                  <div
                    className="absolute inset-0 w-14 h-14 rounded-full"
                    style={{
                      backgroundColor: "var(--bb-primary)",
                      opacity: 0.4,
                      animation:
                        "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <div
                    className="absolute inset-0 w-14 h-14 rounded-full"
                    style={{
                      backgroundColor: "var(--bb-primary)",
                      opacity: 0.3,
                      animation:
                        "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s",
                    }}
                  />

                  {/* Microphone icon */}
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: "var(--bb-primary)",
                      animation: "bounce 2s ease-in-out infinite",
                    }}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------- */}
        {/* Identity text: name & tagline   */}
        {/* ------------------------------- */}
        <div className="space-y-3 mb-8">
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight"
            style={{
              color: "var(--bb-text)",
              animation: "slideUp 0.6s ease-out 0.2s both",
            }}
          >
            BillBuddy
          </h1>
          <p
            className="text-lg sm:text-xl font-medium"
            style={{
              color: "var(--bb-text-muted)",
              animation: "slideUp 0.6s ease-out 0.4s both",
            }}
          >
            AI-Powered Shop Assistant
          </p>
        </div>

        {/* ------------------------------- */}
        {/* Progress feedback: loading dots */}
        {/* ------------------------------- */}
        <div
          className="flex items-center justify-center gap-2 mb-8"
          style={{ animation: "slideUp 0.6s ease-out 0.6s both" }}
        >
          {[0, 0.2, 0.4].map((delay) => (
            <div
              key={delay}
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: "var(--bb-primary)",
                animation: `bounce 1.4s infinite ease-in-out both ${delay}s`,
              }}
            />
          ))}
        </div>

        {/* -------------------------------- */}
        {/* Capability hints (feature pills) */}
        {/* -------------------------------- */}
        <div
          className="flex flex-wrap items-center justify-center gap-3"
          style={{ animation: "slideUp 0.6s ease-out 0.8s both" }}
        >
          {/* Voice First */}
          <div className="px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 shadow-md bg-white/90 border border-blue-600/10">
            <span className="text-lg">🎤</span>
            <span className="text-sm font-semibold text-(--bb-text)">
              Voice First
            </span>
          </div>

          {/* Real-time Insights */}
          <div className="px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 shadow-md bg-white/90 border border-blue-600/10">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-semibold text-(--bb-text)">
              Real-time Insights
            </span>
          </div>

          {/* Smart AI */}
          <div className="px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 shadow-md bg-white/90 border border-blue-600/10">
            <span className="text-lg">🧠</span>
            <span className="text-sm font-semibold text-(--bb-text)">
              Smart AI
            </span>
          </div>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* Scoped animations (loading only) */}
      {/* -------------------------------- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
