import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../auth/hook/useAuth";
import Loading from "../shared/components/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading ,setupComplete} = useAuth(); 

  // Wait for Firebase auth state
  if (loading) {
    return <Loading />;
  }

  // ❗ Redirect to HOME if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }
    // ❗ Redirect to SHOP SETUP if user record does not exist
  if (!setupComplete) {
    return <Navigate to="/shop-setup" replace />;
  }
  

  return <>{children}</>;
}
