import { useEffect, useState } from "react";
import type { StockItem } from "../types/stock.types";
import { useAuth } from "../../auth/hook/useAuth";
import { addStockItem, deleteStockItem, subscribeToStockItems ,updateStock , swapStock} from "../services/stock.service";
import type { StockStatus } from "../types/stock.types";
import { useToast } from "../../ui/toast/useToast";


/**
 * useStockItems (V0)
 *
 * Responsibility:
 * - Fetch stock items for the logged-in user
 * - Expose loading and error state
 *
 * Non-responsibility:
 * - Filtering
 * - Searching
 * - UI concerns
 */


export function  useStockItems() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const { showToast } = useToast();

    
   useEffect(() => {
  // No user → no stock
  if (!user) {
    setItems([]);
    setLoading(false);
    return;
  }

  setLoading(true);
  setError(null);

  const unsubscribe = subscribeToStockItems(
    user.uid,
    (items) => {
      setItems(items);
      setLoading(false);
    },
    () => {
      setError("Failed to sync stock items");
      setLoading(false);
    }
  );

  // Cleanup listener on unmount / user change
  return () => unsubscribe();
}, [user?.uid]);


 

  const deleteItem = async (itemId: string) => {
  try {
    await deleteStockItem(itemId);
  } catch (err) {
    console.error("Failed to delete item", err);
  }
};

const editItem = async (itemId: string, name: string, status: StockStatus) => {
  try {
    await updateStock(itemId, name, status);
    showToast("success", "Item Updated");
} catch (err) {
    console.error("Failed to update item", err);
  }
};

const addItem = async (data: { name: string; status: StockStatus }) => {
  if (!user) {
    console.error("Cannot add item: no user logged in");
    return;
  }
  try {
    await addStockItem(user.uid, data);
    showToast("success", "Item added");
  }
  catch (err) {
    console.error("Failed to add item", err);
  }

}

const editStatus= async ( itemId: string,  status: StockStatus ) => {
  if (!user) {
    console.error("Cannot add item: no user logged in");
    return;
  }
  try {
    await swapStock(itemId, status);
    showToast("success", "Item Swapped");
  }
  catch (err) {
    console.error("Failed to Edit Status", err);
  }

}


  return {
    items,
    loading,
    error,
    deleteItem,
    addItem,
    editItem,
    editStatus
  };
}
