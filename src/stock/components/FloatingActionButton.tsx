import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export default function FloatingActionButton({
  onClick,
}: FloatingActionButtonProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Logic: Hide if scrolling down, show if scrolling up
      // currentScrollY > 50 ensures it doesn't flicker at the very top
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <button
      onClick={onClick}
      aria-label="Add Item"
      className={`
        fixed bottom-20 right-4 z-100
        flex h-14 w-14 items-center justify-center
        rounded-full text-white shadow-lg transition-all duration-300
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"}
      `}
      style={{ backgroundColor: "var(--bb-primary)" }}
    >
      <Plus className="h-6 w-6" />
    </button>
  );
}