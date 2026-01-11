import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firestore";

/**
 * Checks whether a user document exists in Firestore
 * @param uid Firebase Auth UID
 * @returns boolean (true = exists, false = new user)
 */
export async function doesUserExist(uid: string): Promise<boolean> {
  const userRef = doc(db, "user", uid);
  const snap = await getDoc(userRef);
  return snap.exists();
}
