import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Home, Package, Mail, LogIn } from "lucide-react";
import { useAuth } from "../../auth/hook/useAuth";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  // Configuration for navigation items
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/stock", label: "Stock", icon: Package, isPrimary: true },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* ========================================
        TOP HEADER
        ========================================
      */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            
            {/* LEFT — LOGO */}
            <Link 
              to="/" 
              className="flex items-center gap-3"
            >
              <div
                className="flex items-center justify-center rounded-xl shadow-sm"
                style={{
                  width: "42px",
                  height: "42px",
                  backgroundColor: "var(--bb-secondary)",
                }}
              >
                <img
                  src="/src/assets/logo/BillBuddyLogo2.png"
                  alt="BillBuddy Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>

              <span className="font-bold text-lg sm:text-xl tracking-tight" style={{ color: "var(--bb-text)" }}>
                BillBuddy
              </span>
            </Link>

            {/* CENTER — DESKTOP NAV (Hidden on Mobile) */}
            <nav className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
              {navItems.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium ${
                      active ? "shadow-sm" : "text-gray-500"
                    }`}
                    style={{
                      color: active ? "var(--bb-primary)" : undefined,
                      backgroundColor: active ? "white" : undefined,
                    }}
                  >
                    <Icon className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT — AUTH & PROFILE */}
            <div className="flex items-center gap-3">
              {!user ? (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg"
                  style={{ backgroundColor: "var(--bb-primary)" }}
                >
                  <LogIn className="w-4 h-4" />
                  <span className=" sm:inline">Login</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate("/profile")}
                  className="relative p-1 rounded-full"
                >
                  <div className="absolute inset-0 rounded-full border-2 border-transparent" />
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: "var(--bb-primary)" }}
                  >
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}