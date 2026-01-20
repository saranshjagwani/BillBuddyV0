import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/auth";
import type { User } from "firebase/auth";
import { doesUserExist } from "../../shop/services/user.service";

/**
 * useAuth
 *
 * Central auth hook for BillBuddy.
 *
 * Responsibilities:
 * - Track Firebase authentication state
 * - Expose loading state
 * - Determine whether initial shop setup is complete
 *
 * Design principles:
 * - Firestore is source of truth
 * - localStorage is used as a lightweight cache
 * - No repeated unnecessary Firestore calls
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);

  /**
   * setupComplete meanings:
   * - null  → unknown / not logged in
   * - false → logged in, setup not completed
   * - true  → logged in, setup completed
   */
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);

      // 🔴 User logged out → reset everything
      if (!u) {
        setSetupComplete(null);
        setLoading(false);
        return;
      }

      const cacheKey = `bb_setup_complete_${u.uid}`;

      // 🟢 1. Try localStorage first
      const cached = localStorage.getItem(cacheKey);
      if (cached === "true") {
        setSetupComplete(true);
        setLoading(false);
        return;
      }

      // 🟡 2. Cache miss → check Firestore once
      try {
        const exists = await doesUserExist(u.uid);
        setSetupComplete(exists);

        // Cache only positive result
        if (exists) {
          localStorage.setItem(cacheKey, "true");
        }
      } catch (error) {
        console.error("Failed to check setup status", error);
        setSetupComplete(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { user, loading, setupComplete };
}
