import { useState } from "react";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc,serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firestore";
import { useAuth } from "../../auth/hook/useAuth";
import { useToast } from "../../ui/toast/useToast";

export default function ShopSetupPage() {
  const [shopName, setShopName] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const {showToast}=useToast();

  const handleContinue = async (): Promise<void> => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    const trimmedShopName = shopName.trim();

    if (!trimmedShopName) {
      setError("Shop name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await setDoc(doc(db, "user", user.uid), {
        phoneNumber: user.phoneNumber,
        shopName: trimmedShopName,
         createdAt: serverTimestamp(),

      });

      navigate("/stock", { replace: true });
    } catch (err) {
      console.error("Failed to create user profile:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
      showToast("error",error);
    setError("");
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  const handleShopNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setShopName(value);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: "var(--bb-bg-soft)" }}
    >
      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Logo Section */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className="h-32 w-32 sm:h-36 sm:w-36 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
              style={{
                borderRadius: "28px",
                backgroundColor: "var(--bb-secondary)",
              }}
            >
              <img
                src="/BillBuddyLogo2.png"
                alt="BillBuddy Logo"
                className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: "var(--bb-text)" }}
            >
              Setup Your Shop
            </h1>
            <p
              className="text-sm sm:text-base"
              style={{ color: "var(--bb-text-muted)" }}
            >
              Let's get started with your shop details
            </p>
          </div>

          {/* Shop Name Input */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--bb-text)" }}
            >
              Shop Name <span style={{ color: "var(--bb-danger)" }}>*</span>
            </label>

            <div className="relative">
              {/* Icon */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-5 h-5"
                  style={{
                    color: isFocused
                      ? "var(--bb-primary)"
                      : "var(--bb-text-muted)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>

              {/* Input */}
              <input
                type="text"
                value={shopName}
                onChange={handleShopNameChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your shop name"
                disabled={loading}
                maxLength={50}
                className="w-full pl-12 pr-4 py-3 sm:py-3.5 rounded-xl border outline-none transition-all duration-200 text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  borderColor: error
                    ? "var(--bb-danger)"
                    : isFocused
                    ? "var(--bb-primary)"
                    : "var(--bb-border)",
                  color: "var(--bb-text)",
                  backgroundColor: loading ? "#f9fafb" : "white",
                  boxShadow:
                    isFocused && !error
                      ? "0 0 0 3px rgba(37, 99, 235, 0.1)"
                      : "none",
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="mt-3 flex items-start gap-2 p-3 rounded-lg"
                style={{ backgroundColor: "#fee2e2" }}
              >
                <svg
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: "var(--bb-danger)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--bb-danger)" }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* Helper Text */}
            {!error && (
              <div className="mt-2 flex items-start gap-1.5">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  style={{ color: "var(--bb-text-muted)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p
                  className="text-xs sm:text-sm leading-tight"
                  style={{ color: "var(--bb-text-muted)" }}
                >
                  This will be displayed on your bills and reports
                </p>
              </div>
            )}

            {/* Character Counter */}
            {shopName.length > 0 && !error && (
              <div className="mt-2 text-right">
                <span
                  className="text-xs font-medium"
                  style={{
                    color:
                      shopName.length >= 3 && shopName.length <= 50
                        ? "var(--bb-success)"
                        : "var(--bb-text-muted)",
                  }}
                >
                  {shopName.length}/50 characters
                </span>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={
              shopName.trim().length < 3 ||
              shopName.trim().length > 50 ||
              loading
            }
            className="w-full py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
                       transition-all duration-200 transform
                       disabled:opacity-50 disabled:cursor-not-allowed
                       active:scale-[0.98]
                       shadow-lg hover:shadow-xl
                       flex items-center justify-center gap-2"
            style={{
              backgroundColor:
                shopName.trim().length >= 3 &&
                shopName.trim().length <= 50 &&
                !loading
                  ? "var(--bb-primary)"
                  : "#93c5fd",
              color: "white",
            }}
            onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
              if (
                shopName.trim().length >= 3 &&
                shopName.trim().length <= 50 &&
                !loading
              ) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--bb-primary-hover)";
              }
            }}
            onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
              if (
                shopName.trim().length >= 3 &&
                shopName.trim().length <= 50 &&
                !loading
              ) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "var(--bb-primary)";
              }
            }}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Setting up...</span>
              </>
            ) : (
              "Continue"
            )}
          </button>

          {/* Info Section */}
          <div
            className="mt-6 sm:mt-8 pt-6 border-t"
            style={{ borderColor: "var(--bb-border)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#dbeafe" }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--bb-primary)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--bb-text)" }}
                >
                  Why we need this?
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--bb-text-muted)" }}
                >
                  Your shop name helps personalize your experience and appears
                  on all generated bills and invoices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
