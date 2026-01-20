import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import type { ConfirmationResult, User } from "firebase/auth";
import { auth } from "../../firebase/auth";

/**
 * Holds the confirmation result returned by Firebase
 * after an OTP is successfully sent.
 *
 * This is intentionally kept at module scope so that:
 * - OTP can be sent in one step
 * - OTP can be verified in a later step
 *
 * This value is short-lived and only valid
 * for the current login attempt.
 */
let confirmationResult: ConfirmationResult | null = null;

/**
 * setupRecaptcha
 *
 * Initializes Firebase Recaptcha in "invisible" mode.
 *
 * Design intent:
 * - Avoid interrupting the user with captcha UI
 * - Keep login flow fast and frictionless
 *
 * Technical notes:
 * - Firebase requires reCAPTCHA for phone auth
 * - We attach it to `window` because Firebase internally
 *   expects a global verifier instance
 *
 * This should be called once before sending OTP.
 */
export function setupRecaptcha(containerId: string): void {
  (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
}

/**
 * sendOtp
 *
 * Sends an OTP to the given phone number using Firebase Phone Auth.
 *
 * Flow:
 * - Uses the previously initialized Recaptcha verifier
 * - Prefixes country code (+91) explicitly (India-only for V0)
 * - Stores the confirmation result for later verification
 *
 * Responsibility:
 * - ONLY sends OTP
 * - Does NOT verify OTP
 * - Does NOT handle UI or errors
 */
export async function sendOtp(phoneNumber: string): Promise<void> {
  const appVerifier = (window as any).recaptchaVerifier;
  console.log("App Verifier:", appVerifier);

  confirmationResult = await signInWithPhoneNumber(
    auth,
    `+91${phoneNumber}`,
    appVerifier
  );
}

/**
 * verifyOtp
 *
 * Verifies the OTP entered by the user.
 *
 * Flow:
 * - Confirms the OTP against Firebase
 * - If successful, Firebase creates / returns the User
 *
 * Important:
 * - This function assumes `sendOtp` was already called
 * - If not, it throws a clear error instead of failing silently
 *
 * Returns:
 * - The authenticated Firebase User object
 *
 * This function does NOT:
 * - Decide navigation
 * - Create Firestore user records
 * - Handle onboarding
 */
export async function verifyOtp(code: string): Promise<User> {
  if (!confirmationResult) {
    throw new Error("OTP not requested");
  }

  const result = await confirmationResult.confirm(code);
  return result.user;
}


