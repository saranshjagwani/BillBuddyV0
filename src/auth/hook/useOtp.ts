import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { setupRecaptcha, sendOtp , verifyOtp} from "../services/auth.service";
import { doesUserExist } from "../../shop/services/user.service";
import { useNavigate } from "react-router-dom";
import {usePhoneAuth} from "../hook/usePhoneAuth";

 export function useOtpAuth() {

  const {phoneNumber} = usePhoneAuth();
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

   return{
    // state
    otp,
    loading,
    error,
    resendTimer,

    // actions

    handleChange,
    handleKeyDown,
    handlePaste,
    handleResend,

    //refs
    inputRefs,
   };  

}

  