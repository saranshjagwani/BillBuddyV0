
import type { StockItem ,StockStatus} from "../types/stock.types";
import StockItemCard from "./StockItemCard";
import { Package } from "lucide-react";



interface StockListProps {
  items: StockItem[];
  onDelete: (itemId: string) => void;
  onEdit: (item: StockItem ) => void;
  onEditStatus:(ItemId:string ,status:StockStatus) =>void;
}


export default function StockList({ items, onDelete, onEdit ,onEditStatus}: StockListProps) {
  // Empty state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-100">
        <div 
          className="w-24 h-24 rounded-3xl flex items-center justify-center mb-4 shadow-lg"
          style={{ backgroundColor: "#f3f4f6" }}
        >
          <Package 
            className="w-12 h-12" 
            style={{ color: "var(--bb-text-muted)" }}
            strokeWidth={1.5}
          />
        </div>
        
        <h3 
          className="text-xl font-bold mb-2"
          style={{ color: "var(--bb-text)" }}
        >
          No Items Yet
        </h3>
        
        <p 
          className="text-sm text-center max-w-xs mb-6"
          style={{ color: "var(--bb-text-muted)" }}
        >
          Start adding items to your inventory to track your stock efficiently
        </p>

        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--bb-text-muted)" }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--bb-primary)" }}></div>
          <span>Tap the + button to add your first item</span>
        </div>
      </div>
    );
  }
  else{
  return (

    <div className="flex flex-col gap-2 p-3 ">
      
      {items.map((item) => (
        <StockItemCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          onEditStatus={onEditStatus}

        />
      ))}
    </div>
  );
}
}
