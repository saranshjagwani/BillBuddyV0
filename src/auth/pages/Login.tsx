import VerifyOtpPage from "../components/Otp-Verify";
import { usePhoneAuth } from "../hook/usePhoneAuth";
import { LoginComponent } from "../components/Login-Component";

export default function Login() {
  const phoneAuth = usePhoneAuth();

  return (
    <>
      {phoneAuth.step === "PHONE" && (
         <LoginComponent
          phoneNumber={phoneAuth.phoneNumber}
          isFocused={phoneAuth.isFocused}
          loading={phoneAuth.loading}
          error={phoneAuth.error}
          setIsFocused={phoneAuth.setIsFocused}
          handleContinue={phoneAuth.handleContinue}
          handleKeyPress={phoneAuth.handleKeyPress}
          handlePhoneChange={phoneAuth.handlePhoneChange}
        />
      )}

      {phoneAuth.step === "OTP" && (
        <VerifyOtpPage
          phoneNumber={phoneAuth.phoneNumber}
          onBack={() => phoneAuth.setStep("PHONE")}
        />
      )}
    </>
  );
}
