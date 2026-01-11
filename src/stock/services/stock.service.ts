import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firestore";
import type { StockItem, StockStatus } from "../types/stock.types";


/**
 * Firestore collection name
 * Single source of truth
 */
const ITEMS_COLLECTION = "items";
const capitalizeWords = (text: string): string => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Fetch all stock items for a user
 */

export function subscribeToStockItems(
  userId: string,
  onData: (items: StockItem[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(
  collection(db, "items"),
  where("userId", "==", userId),
  orderBy("updatedAt", "desc")
)


  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const items: StockItem[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<StockItem, "id">),
      }));

      onData(items);
    },
    (error) => {
      console.error("Stock listener error:", error);
      onError?.(error);
    }
  );

  return unsubscribe;
}

/**
 * Add a new stock item
 */
export  function addStockItem(
  userId: string,
  data: {
    name: string;
    status: StockStatus;
  }
): void {
 addDoc(collection(db, ITEMS_COLLECTION), {
    userId,
    itemName: capitalizeWords(data.name.trim()),
    status: data.status,
    createdAt: serverTimestamp(),
    updatedAt:serverTimestamp(),
  });
}

/**
 * Update stock item status
 */
export async function updateStock(
  itemId: string,
  itemName: string,
  status: StockStatus
): Promise<void> {
  const ref = doc(db, ITEMS_COLLECTION, itemId);
  itemName=capitalizeWords(itemName);
  await updateDoc(ref, { itemName, status , updatedAt:serverTimestamp(),
  });
}

/**
 Swap a Stock Item 
 **/

 export async function swapStock(
  itemId:string,
  status:StockStatus
 ): Promise<void>{
  const ref= doc(db, ITEMS_COLLECTION, itemId);
  await updateDoc(ref, {status ,updatedAt:serverTimestamp()});
 }

/**
 * Delete a stock item
 */
export async function deleteStockItem(
  itemId: string
): Promise<void> {
  const ref = doc(db, ITEMS_COLLECTION, itemId);
  await deleteDoc(ref);
}
