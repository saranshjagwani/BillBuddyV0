import { FileText, User, Search, Menu } from "lucide-react";
import type { StockStatus } from "../types/stock.types";
import { Link } from "react-router-dom";


interface TopBarProps {
  onPdfClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  value: string;
  statusFilter?: StockStatus | "inStock";
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TopBar({
  onPdfClick,
  onProfileClick,
  onMenuClick,
  value,
  onChange,
  placeholder = "Search items",
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3">
        
        {/* LEFT: Menu + Logo */}
        <Link to="/">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="p-2 rounded-full hover:bg-gray-50 transition-colors lg:hidden"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" style={{ color: "var(--bb-text-muted)" }} />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "var(--bb-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <img
                src="/BillBuddyLogo2.png"
                alt="BillBuddy"
                className="w-8.75 h-8.75 object-contain"
              />
            </div>

            <h1 className="hidden sm:block text-lg font-semibold" style={{ color: "var(--bb-text)" }}>
              BillBuddy
            </h1>
          </div>
        </div>
        </Link>

        {/* CENTER: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div 
            className="relative flex items-center rounded-full px-4 py-2 transition-all duration-200 border"
            style={{ 
              backgroundColor: "#fafafa",
              borderColor: "#e5e7eb",
            }}
          >
            <Search className="w-4 h-4 mr-3 shrink-0" style={{ color: "#9ca3af" }} />
            
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
              style={{ 
                color: "var(--bb-text)",
              }}
            />

            {value && (
              <button
                onClick={() => onChange("")}
                className="ml-2 p-1 rounded-full hover:bg-gray-200/60 transition-colors shrink-0"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" style={{ color: "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3">
         {onPdfClick && (
  <button
    onClick={onPdfClick}
    aria-label="Export PDF"
    title="Export PDF"
    className="
      group
      p-2.5
      rounded-full
      bg-blue-50
      border border-blue-200
      hover:bg-blue-100
      hover:border-blue-300
      active:scale-95
      transition-all
      duration-150
      shadow-sm
    "
  >
    <FileText
      className="
        w-5 h-5
        text-blue-600
        group-hover:text-blue-700
        transition-colors
      "
      strokeWidth={1.5}
    />
  </button>
)}



          <button
            onClick={onProfileClick}
            className="p-0 rounded-full transition-all hover:ring-2 ring-blue-100"
            aria-label="Profile"
            title="Profile"
          >
            <div 
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--bb-primary)" }}
            >
              <User className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}