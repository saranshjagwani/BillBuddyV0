import type { ChangeEvent, KeyboardEvent} from "react";
import { useState } from "react";
import { setupRecaptcha, sendOtp } from "../services/auth.service";



type Step = "PHONE" | "OTP";

export function usePhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isCaptcha, setIsCaptcha] = useState(false);
  const [step, setStep] = useState<Step>("PHONE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  const statechange = (newStep: Step) => {
    setStep(newStep);
    console.log("Step is now ",newStep);
  };

  /**
   * WHY:
   * Centralizes OTP send logic so UI never handles side-effects.
   * Prevents duplicated logic across screens.
   */
  const handleContinue = async () => {
    try {
     setLoading(true);

      if (!isCaptcha) {
        setupRecaptcha("recaptcha-container");
      }
           
      await sendOtp(phoneNumber);
      console.log("Sending OTP to:", phoneNumber);
      console.log("reCAPTCHA verified:", isCaptcha);
      console.log("OTP sent successfully (simulated).");
      console.log("Step is ",step);
      statechange("OTP");
      console.log("Step changed to ",step);
    } catch (err) {
      console.error(err);
      setIsCaptcha(true);
      setPhoneNumber("");
      setError("Something went wrong. Please try again.");

      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  /**
   * WHY:
   * Keeps input sanitization out of UI.
   * Guarantees phone is always valid everywhere.
   */
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return {
    // state
    phoneNumber,
    isFocused,
    step,
    loading,
    error,

    // setters (UI-only concerns)
    setIsFocused,
    setStep,

    // actions
    handleContinue,
    handlePhoneChange,
    handleKeyPress,
  };
}

