import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { setupRecaptcha, sendOtp } from "../services/auth.service";
import VerifyOtpPage from "./Otp-Verify";
import { verifyOtp as verifyOtpService } from "../services/auth.service";

export default function BillBuddyLogin() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isCaptcha, setIsCaptcha] =useState<boolean>(false);
  const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleContinue = async (): Promise<void> => {
    try {
      setLoading(true);
     if(!isCaptcha){
  setupRecaptcha("recaptcha-container");
     }
    

      await sendOtp(phoneNumber);
      setStep("OTP");
    } catch (err) {
      console.error(err);
      setIsCaptcha(true);
      setPhoneNumber("");
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError(""); 
      }, 2000);

      
      
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
  };

  return (
    <>
      {step === "PHONE" && (
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
                  className="h-32 w-32 sm:h-40 sm:w-40 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
                  style={{
                    borderRadius: "28px",
                    backgroundColor: "var(--bb-secondary)",
                  }}
                >
                  <img
                    src="/src/assets/logo/BillBuddyLogo2.png"
                    alt="BillBuddy Logo"
                    className="h-28 w-28 sm:h-36 sm:w-36 object-contain"
                  />
                </div>
              </div>
              {/* Title */}
              <div className="text-center mb-6 sm:mb-8">
                <h1
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{ color: "var(--bb-text)" }}
                >
                  Welcome to BillBuddy
                </h1>
                <p
                  className="text-sm sm:text-base"
                  style={{ color: "var(--bb-text-muted)" }}
                >
                  Your smart shop assistant
                </p>
              </div>

              {/* Phone Input Section */}
              <div className="mb-6">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--bb-text)" }}
                >
                  Phone Number
                </label>
                <div className="flex gap-2 sm:gap-3">
                  {/* Country Code */}
                  <div
                    className="flex items-center justify-center px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl border transition-all"
                    style={{
                      borderColor: isFocused
                        ? "var(--bb-primary)"
                        : "var(--bb-border)",
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <span
                      className="text-base sm:text-lg font-semibold whitespace-nowrap"
                      style={{ color: "var(--bb-text)" }}
                    >
                      +91
                    </span>
                  </div>

                  {/* Phone Input */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter number" // Shortened for mobile space
                    className="
    /* Width: shorter on mobile (max-w-[200px]), full-ish on desktop */
    w-full max-w-67.5 sm:max-w-md 
    
    /* Padding: small on mobile (py-1.5), larger on desktop */
    px-3 py-1.5 sm:px-4 sm:py-3.5 
    
    /* Font: small on mobile, large on desktop */
     sm:text-lg
    
    rounded-xl border outline-none text-base
  "
                    style={{
                      borderColor: isFocused
                        ? "var(--bb-primary)"
                        : "var(--bb-border)",
                      color: "var(--bb-text)",
                      backgroundColor: "white",
                      boxShadow: isFocused
                        ? "0 0 0 3px rgba(37, 99, 235, 0.1)"
                        : "none",
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                {/* Helper Text */}
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
                    We'll send you a verification code
                  </p>
                </div>
              </div>
              {/* Error Message */}
              {error && (
                <div
                  className="mt-4 flex items-start gap-2 p-3 rounded-lg"
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

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={phoneNumber.length !== 10 || loading}
                className="pt-2.5 sm:pt-3.5 w-full py-3.5 sm:py-4 rounded-xl font-semibold text-base sm:text-lg
                       transition-all duration-200 transform
                       disabled:opacity-50 disabled:cursor-not-allowed
                       active:scale-[0.98]
                       shadow-lg hover:shadow-xl
                       flex items-center justify-center gap-2"
                style={{
                  backgroundColor:
                    phoneNumber.length === 10 && !loading
                      ? "var(--bb-primary)"
                      : "#93c5fd",
                  color: "white",
                }}
                onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                  if (phoneNumber.length === 10 && !loading) {
                    (e.target as HTMLButtonElement).style.backgroundColor =
                      "var(--bb-primary-hover)";
                  }
                }}
                onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                  if (phoneNumber.length === 10 && !loading) {
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
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="mt-4 sm:mt-6 text-center px-4">
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--bb-text-muted)" }}
              >
                By continuing, you agree to BillBuddy's{" "}
                <div>
                  <button
                    className="font-medium underline transition-colors"
                    style={{ color: "var(--bb-primary)" }}
                    onMouseEnter={(e: MouseEvent<HTMLButtonElement>) =>
                      ((e.target as HTMLButtonElement).style.color =
                        "var(--bb-primary-hover)")
                    }
                    onMouseLeave={(e: MouseEvent<HTMLButtonElement>) =>
                      ((e.target as HTMLButtonElement).style.color =
                        "var(--bb-primary)")
                    }
                    onClick={() => navigate("/terms", { replace: true })}
                  >
                    Terms
                  </button>
                  <span className="p-1">&</span>
                  <button
                    className="font-medium underline transition-colors"
                    style={{ color: "var(--bb-primary)" }}
                    onMouseEnter={(e: MouseEvent<HTMLButtonElement>) =>
                      ((e.target as HTMLButtonElement).style.color =
                        "var(--bb-primary-hover)")
                    }
                    onMouseLeave={(e: MouseEvent<HTMLButtonElement>) =>
                      ((e.target as HTMLButtonElement).style.color =
                        "var(--bb-primary)")
                    }
                    onClick={() => navigate("/privacy", { replace: true })}
                  >
                    Privacy Policy
                  </button>
                </div>
              </p>
            </div>
            <div id="recaptcha-container"> </div>
          </div>
        </div>
      )}
      {step === "OTP" && (
        <VerifyOtpPage
          phoneNumber={phoneNumber}
          onBack={() => setStep("PHONE")}
          verifyOtp={verifyOtpService}
        />
      )}
    </>
  );
}
