/**
 * Stock domain types (V0)
 *
 * Minimal and intentional.
 * This file defines the single source of truth
 * for stock items in BillBuddy V0.
 *
 * NOTE:
 * - Quantity, price, unit, timestamps are intentionally omitted
 * - These will be introduced incrementally in later versions
 */

export type StockStatus = "inStock" | "outOfStock";

export interface StockItem {
  /** Unique identifier (Firestore doc id) */
  id: string;

  /** Display name of the stock item */
  itemName: string;

  /** Availability status */
  status: StockStatus;
}
