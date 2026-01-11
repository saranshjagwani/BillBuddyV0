// src/ui/toast/Toast.tsx
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import type { ToastItem } from "../types/types";

export default function Toast({ toast }: { toast: ToastItem }) {
  const styles = {
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  const icons = {
    success: <CheckCircle size={18} />,
    error: <XCircle size={18} />,
    warning: <AlertTriangle size={18} />,
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-md ${styles[toast.type]}`}
    >
      {icons[toast.type]}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
