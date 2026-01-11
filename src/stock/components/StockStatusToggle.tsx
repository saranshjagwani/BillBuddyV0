interface StockStatusToggleProps {
  value: "inStock" | "outOfStock";
  onChange: (value: "inStock" | "outOfStock") => void;
}

export default function StockStatusToggle({
  value,
  onChange,
}: StockStatusToggleProps) {
  return (
    <div className="sticky top-16 z-10 bg-white border-b" style={{ borderColor: "var(--bb-border)" }}>
  <div className="flex w-full relative">
    {/* In Stock */}
    <button
      type="button"
      onClick={() => onChange("inStock")}
      className="flex-1 px-4 py-3.5 text-sm font-semibold transition-colors duration-300 outline-none"
      style={{
        color: value === "inStock" ? "var(--bb-success)" : "var(--bb-text-muted)",
      }}
    >
      In Stock
    </button>

    {/* Out of Stock */}
    <button
      type="button"
      onClick={() => onChange("outOfStock")}
      className="flex-1 px-4 py-3.5 text-sm font-semibold transition-colors duration-300 outline-none"
      style={{
        color: value === "outOfStock" ? "var(--bb-danger)" : "var(--bb-text-muted)",
      }}
    >
      Out of Stock
    </button>

    {/* SHARED UNDERLINE INDICATOR */}
    <div
      className="absolute bottom-0 h-0.5 transition-all duration-300 ease-out"
      style={{
        width: "50%",
        left: value === "inStock" ? "0%" : "50%",
        backgroundColor: value === "inStock" ? "var(--bb-success)" : "var(--bb-danger)",
      }}
    />
  </div>
</div>
  );
}