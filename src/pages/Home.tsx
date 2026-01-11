import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BillBuddyHome() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const navigate = useNavigate();

  const futureFeatures = [
    {
      icon: "🎤",
      title: "Voice First",
      description: "Hands-free billing with natural voice commands",
      color: "#2563eb",
    },
    {
      icon: "🧠",
      title: "AI Insights",
      description: "Smart analytics that understand your business",
      color: "#7c3aed",
    },
    {
      icon: "⚡",
      title: "Real-time Tracking",
      description: "Every product, every sale, instantly tracked",
      color: "#f59e0b",
    },
    {
      icon: "📊",
      title: "Smart Reports",
      description: "Automated insights without lifting a finger",
      color: "#16a34a",
    },
  ];

  const handleGoToStock = () => {
    navigate("/stock");
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Announcement */}
          <div className="text-center mb-12 sm:mb-16 space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-100 to-yellow-100 border border-blue-200 mb-4">
              <span className="text-2xl animate-pulse">✨</span>
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                Coming Soon: V1
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Your Shop's
              <br />
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent">
                AI Manager
              </span>
              <br />
              is Coming
            </h2>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              V1 brings a{" "}
              <span className="font-semibold text-gray-900">
                power-packed voice assistant
              </span>{" "}
              to generate bills, track inventory, and manage your shop — all
              with just your voice.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Currently: Basic MVP (V0)
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                <span className="text-lg">🚀</span>
                <span className="text-sm font-semibold">
                  Next: AI Voice Revolution
                </span>
              </div>
            </div>
          </div>

          {/* Future Features Grid */}
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8">
              What's Coming in V1
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {futureFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-2xl bg-white border border-gray-200 shadow-lg 
                             transition-all duration-300 cursor-pointer group"
                  style={{
                    transform:
                      hoveredFeature === index
                        ? "translateY(-8px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredFeature === index
                        ? `0 20px 40px ${feature.color}30`
                        : "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${feature.color}15`,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Shine effect on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${feature.color}10 50%, transparent 100%)`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* About V0 Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-4">
                  <span className="text-xl">📦</span>
                  <span className="text-sm font-semibold text-gray-700">
                    Current Version
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  BillBuddy V0
                </h3>
                <p className="text-lg text-gray-600">
                  The Basic MVP — Your Foundation
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0 text-white font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Stock Management
                    </h4>
                    <p className="text-sm text-gray-600">
                      Basic inventory tracking to get you started
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center shrink-0 text-white font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      PDF Generation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Download PDF reports of products
                      anytime.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shrink-0 text-white font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Foundation for Growth
                    </h4>
                    <p className="text-sm text-gray-600">
                      The groundwork for the AI revolution ahead
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 text-white text-center">
                <p className="text-lg font-semibold mb-2">🎯 Our Vision</p>
                <p className="text-sm opacity-90">
                  Transform every shop into a smart, voice-powered business with
                  AI insights that understand your needs before you even ask.
                </p>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center mt-16 space-y-4">
            <p className="text-gray-600 text-sm sm:text-base">
              Ready to experience the basics?
            </p>
            <button
              onClick={handleGoToStock}
              className="px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl
                         transition-all duration-200 transform hover:scale-105 active:scale-95
                         shadow-2xl hover:shadow-3xl"
              style={{
                backgroundColor: "var(--bb-primary)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--bb-primary-hover)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--bb-primary)";
              }}
            >
              Start with V0 Now →
            </button>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
