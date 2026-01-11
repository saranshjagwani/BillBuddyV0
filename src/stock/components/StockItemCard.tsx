import { Pencil, Trash2, ArrowLeftRight } from "lucide-react";
import type { StockItem, StockStatus } from "../types/stock.types";
import { AVATAR_COLORS } from "../data/colors";

interface StockItemCardProps {
  item: StockItem;
  onEdit: (item: StockItem) => void;
  onDelete: (id: string) => void;
  onEditStatus: (id: string, status: StockStatus) => void;
}

/** Get initials from item name */
const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0].slice(0, 2).toUpperCase()
    : (parts[0][0] + parts[1][0]).toUpperCase();
};



/** Deterministic avatar color */
const getColor = (id: string) =>
  AVATAR_COLORS[id.charCodeAt(0) % AVATAR_COLORS.length];

export default function StockItemCard({
  item,
  onEdit,
  onDelete,
  onEditStatus,
}: StockItemCardProps) {
  const isInStock = item.status === "inStock";

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* LEFT SIDE: Avatar + Info (Grouped to handle spacing) */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0"
          style={{ backgroundColor: getColor(item.id) }}
        >
          {getInitials(item.itemName)}
        </div>

        {/* Item info */}
        <div className="flex flex-col min-w-0">
          <h3 className="font-semibold text-gray-900 text-[15px] capitalize leading-tight wrap-break-words pr-1">
            {(item.itemName)}
          </h3>
          
          {/* Status Badge */}
          <div className="mt-1 flex">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isInStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isInStock ? "bg-green-500" : "bg-red-500"}`}></span>
              {isInStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Actions */}
      {/* Actions */}
      <div className="flex items-center gap-2 sm:self-center pl-0 sm:pl-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50 mt-2 sm:mt-0">
        <button
          onClick={() => onEdit(item)}
          className="p-2 text-blue-600"
          aria-label="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() =>
            onEditStatus(
              item.id,
              isInStock ? "outOfStock" : "inStock"
            )
          }
          className="p-2 text-gray-700"
          aria-label="Swap status"
        >
          <ArrowLeftRight size={16} />
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="p-2 text-red-600"
          aria-label="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}