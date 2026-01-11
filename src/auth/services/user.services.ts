import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firestore";
import type { AppUserProfile } from "../types/user.types";

/**
 * Fetch basic user profile data
 *
 * Used for:
 * - Profile page
 * - PDF generation
 * - Header / identity
 *
 * Source of truth: Firestore (users collection)
 */
export async function getUserProfile(
  userId: string
): Promise<AppUserProfile | null> {
  try {
    if (!userId) return null;

    const userRef = doc(db, "user", userId);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      console.warn("User document not found:", userId);
      return null;
    }

    const data = snap.data();

    return {
      uid: userId,
      phoneNumber: data.phoneNumber ?? "",
      shopName: data.shopName ?? "",
    };
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}
