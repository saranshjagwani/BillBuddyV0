import { useEffect, useState } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../../firebase/firestore";
import type { StockItem } from "../types/stock.types";
import { useAuth } from "../../auth/hook/useAuth";

/**
 * useStock
 *
 * Real-time stock subscription hook.
 *
 * Responsibilities:
 * - Subscribe to user's stock items
 * - Keep UI in sync across devices
 * - Expose loading state
 *
 * Non-responsibilities:
 * - No add/edit/delete logic
 * - No Firestore writes
 */
export function useStock() {
  const { user } = useAuth();

  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "items"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: StockItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<StockItem, "id">),
      }));

      setItems(data);
      setLoading(false);
    });

    // Cleanup listener on unmount / user change
    return () => unsubscribe();
  }, [user]);

  return { items, loading };
}
