import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import { setupRecaptcha, sendOtp } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { doesUserExist } from "../../shop/services/user.service";

/**
 * VerifyOtpPage
 *
 * Handles OTP verification flow after phone number submission.
 *
 * Responsibilities:
 * - Collect 6-digit OTP input
 * - Handle OTP UX (auto-focus, backspace, paste)
 * - Verify OTP with Firebase
 * - Route user based on shop setup status
 *
 * Design goals:
 * - Mobile-first
 * - Fast and forgiving UX
 * - Minimal cognitive load
 */

interface VerifyOtpPageProps {
  phoneNumber: string;
  onBack?: () => void;
  verifyOtp: (otp: string) => Promise<{ uid: string }>;
}

export default function VerifyOtpPage({
  phoneNumber,
  onBack,
  verifyOtp,
}: VerifyOtpPageProps) {
  /**
   * OTP state
   * Stored as array to manage per-digit focus and control
   */
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  /**
   * UI states
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  /**
   * Resend OTP timer (seconds)
   */
  const [resendTimer, setResendTimer] = useState<number>(30);

  /**
   * Refs to OTP input elements
   * Used for focus management
   */
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  /**
   * Countdown timer for resend OTP
   */
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(
        () => setResendTimer(resendTimer - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  /**
   * Initialize invisible reCAPTCHA
   * Required before sending or resending OTP
   */
  useEffect(() => {
    setupRecaptcha("recaptcha-container");
  }, []);

  /**
   * Auto-submit OTP when all 6 digits are filled
   */
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 6 && !loading) {
      handleVerify(otpString);
    }
  }, [otp]);

  /**
   * Handle OTP verification
   * - Calls verifyOtp prop
   * - Routes based on shop setup status
   * - Manages loading and error states
   */

  const handleVerify = async (otpString: string) => {
    try {
      setLoading(true);
      setError("");
      const user = await verifyOtp(otpString);
      const exists = await doesUserExist(user.uid);

      if (exists) {
        navigate("/stock", { replace: true });
      } else {
        navigate("/shop-setup", { replace: true });
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 
   *  * Handle single digit input
   */
  const handleChange = (index: number, value: string) => {
    // Allow only numeric single digit
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /**
   * Handle keyboard navigation (Backspace behavior)
   */
   const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // If current input is empty, move back on Backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
      setOtp(newOtp);
      // Focus last filled input or last input
      const lastFilledIndex = Math.min(pastedData.length, 5);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  /*
    * Handle resend OTP
    */

  const handleResend = async () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      setError("");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      try {
        await sendOtp(phoneNumber);
      } catch (err) {
        setError("Failed to resend. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 mb-4 sm:p-6 sm:mb-6"
      style={{ backgroundColor: "var(--bb-bg-soft)" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: "var(--bb-text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--bb-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--bb-text-muted)")
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
          )}

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#dbeafe" }}
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12"
                style={{ color: "var(--bb-primary)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: "var(--bb-text)" }}
            >
              Verify OTP
            </h1>
            <p
              className="text-sm sm:text-base mb-1"
              style={{ color: "var(--bb-text-muted)" }}
            >
              We've sent a verification code to
            </p>
            <p
              className="text-base sm:text-lg font-semibold"
              style={{ color: "var(--bb-text)" }}
            >
              +91 {phoneNumber}
            </p>
          </div>

          {/* OTP Input */}
          <div
            className="px-3 py-1.5 rounded-xl"
          >
            <div className="flex gap-1 sm:gap-4 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(index, e)
                  }
                  onPaste={handlePaste}
                  disabled={loading}
                  className="w-11.5 h-11.5 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold
                             rounded-xl border-2 outline-none transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    borderColor: error
                      ? "var(--bb-danger)"
                      : digit
                      ? "var(--bb-primary)"
                      : "var(--bb-border)",
                    color: "var(--bb-text)",
                    backgroundColor: loading ? "#f9fafb" : "white",
                  }}
                  onFocus={(e) => {
                    if (!error)
                      e.target.style.borderColor = "var(--bb-primary)";
                    e.target.select();
                  }}
                  onBlur={(e) => {
                    if (!error && !digit)
                      e.target.style.borderColor = "var(--bb-border)";
                  }}
                />
              ))}
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

            {/* Loading Indicator */}
            {loading && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <div
                  className="animate-spin rounded-full h-5 w-5 border-2 border-b-transparent"
                  style={{ borderColor: "var(--bb-primary)" }}
                ></div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--bb-text-muted)" }}
                >
                  Verifying...
                </span>
              </div>
            )}
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <p
              className="text-sm mb-2"
              style={{ color: "var(--bb-text-muted)" }}
            >
              Didn't receive the code?
            </p>
            {resendTimer > 0 ? (
              <p
                className="text-sm font-medium"
                style={{ color: "var(--bb-text-muted)" }}
              >
                Resend in{" "}
                <span style={{ color: "var(--bb-primary)" }}>
                  {resendTimer}s
                </span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm font-semibold transition-colors hover:underline"
                style={{ color: "var(--bb-primary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--bb-primary-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--bb-primary)")
                }
              >
                Resend OTP
              </button>
            )}
          </div>

          {/* Info */}
          <div
            className="mt-8 pt-6 border-t"
            style={{ borderColor: "var(--bb-border)" }}
          >
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 shrink-0 mt-0.5"
                style={{ color: "var(--bb-text-muted)" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--bb-text-muted)" }}
              >
                For your security, please don't share this code with anyone. It
                will expire in 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"> </div>
    </div>
  );
}
