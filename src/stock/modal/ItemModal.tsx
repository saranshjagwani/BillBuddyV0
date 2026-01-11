import { useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import type { StockStatus } from "../types/stock.types";

/**
 * ItemModalProps
 *
 * This modal is a PURE UI + FORM component.
 *
 * Responsibilities:
 * - Render add/edit item form
 * - Handle local validation
 * - Return cleaned data via onSubmit
 *
 * Non-responsibilities:
 * - No Firebase
 * - No auth
 * - No toasts
 * - No business logic
 */
interface ItemModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  initialName?: string;
  initialStatus?: StockStatus;
  loading?: boolean;
  onSubmit: (data: { name: string; status: StockStatus }) => void;
  onClose: () => void;
}

export default function ItemModal({
  isOpen,
  mode,
  initialName = "",
  initialStatus = "inStock",
  loading = false,
  onSubmit,
  onClose,
}: ItemModalProps) {
  /**
   * Local form state
   */
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<StockStatus>("inStock");
  const [error, setError] = useState<string>("");

  /**
   * Sync modal state when opened
   */
  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setStatus(initialStatus);
      setError("");
    }
  }, [isOpen, initialName, initialStatus]);

  if (!isOpen) return null;

  /**
   * Handle submit click
   */
  const handleSubmit = () => {
    const trimmedName = name.trim();

    // Basic validation
    if (!trimmedName) {
      setError("Item name is required");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Item name must be at least 2 characters");
      return;
    }

    if (trimmedName.length > 50) {
      setError("Item name must be less than 50 characters");
      return;
    }

    onSubmit({
      name: trimmedName,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "add" ? "Add Item" : "Edit Item"}
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Item name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Item Name <span className="text-red-500">*</span>
            </label>

            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              maxLength={50}
              placeholder="Enter item name"
              className="w-full px-4 py-3 border rounded-xl outline-none
                         focus:ring-2 focus:ring-blue-500
                         disabled:bg-gray-50"
              autoFocus
            />

            {error && (
              <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Status toggle */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => setStatus("inStock")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition
                  ${
                    status === "inStock"
                      ? "bg-green-100 text-green-700 ring-2 ring-green-500"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
               ✓ In Stock
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => setStatus("outOfStock")}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition
                  ${
                    status === "outOfStock"
                      ? "bg-red-100 text-red-700 ring-2 ring-red-500"
                      : "bg-gray-100 text-gray-600"
                  }`}
              >
                ✗ Out of Stock
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border text-sm font-medium
                       hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white
                       text-sm font-semibold hover:bg-blue-700
                       disabled:opacity-50"
          >
            {mode === "add" ? "Add Item" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
