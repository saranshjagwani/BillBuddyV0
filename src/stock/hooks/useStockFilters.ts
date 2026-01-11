import { useMemo, useState } from "react";
import type { StockItem, StockStatus } from "../types/stock.types";

/**
 * Filter options for stock list
 */
type StockFilterStatus = StockStatus;

/**
 * useStockFilters (V0)
 *
 * Responsibility:
 * - Apply search filtering
 * - Apply stock status filtering
 *
 * Non-responsibility:
 * - Fetching data
 * - UI logic
 * - Mutating stock items
 */
export function useStockFilters(items: StockItem[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StockFilterStatus>("inStock");

  /**
   * Filtered items derived from source items
   * Memoized for performance and predictability
   */
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1️⃣ Search filter (case-insensitive)
      const itemName = item.itemName ?? "";

      const matchesSearch = itemName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // 2️⃣ Status filter
      const matchesStatus = item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, statusFilter]);

  return {
    filteredItems,

    // filter state
    searchQuery,
    statusFilter,

    // setters
    setSearchQuery,
    setStatusFilter,
  };
}
