import { NavLink } from "react-router-dom";
import { Home, Package, Users } from "lucide-react";

/**
 * Bottom navigation items
 * - Mobile-first navigation
 * - Simple, predictable routes
 */
const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Stock", path: "/stock", icon: Package },
  { label: "Contacts", path: "/contact", icon: Users },
];

/**
 * BottomNav
 *
 * Mobile-only bottom navigation inspired by Google Drive.
 *
 * Design principles:
 * - Simple
 * - Flat
 * - Clear active state
 * - No decorative effects
 *
 * Visibility:
 * - Visible only on small screens
 * - Hidden on tablet & desktop
 */
export default function BottomNav() {
  return (
    <div
      className="
        fixed bottom-0 left-0 right-0
        z-50
        flex justify-center
        sm:hidden
      "
    >
      <nav
        className="
        w-full
        bg-(--bb-bg)
        border-t border-gray-200
"
      >
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex flex-col items-center justify-center
                flex-1
                text-xs
                ${isActive ? "text-(--bb-primary)" : "text-gray-500"}
                `
              }
            >
              {/* Navigation icon */}
              <item.icon size={22} strokeWidth={2} />

              {/* Label */}
              <span className="mt-1 font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
