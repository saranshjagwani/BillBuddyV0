import type {StockStatus} from "../types/stock.types";
interface StockSearchInputProps {
  value: string;
  statusFilter?: StockStatus ;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function StockSearchInput({
  value,
  onChange,
  placeholder = "Search items...",
}: StockSearchInputProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          px-4 py-3
          rounded-xl
          border
          outline-none
          text-sm
        "
        style={{
          borderColor: "var(--bb-border)",
          backgroundColor: "var(--bb-bg)",
          color: "var(--bb-text)",
        }}
      />
    </div>
  );
}
