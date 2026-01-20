import type { ChangeEvent, KeyboardEvent } from "react";

export interface LoginComponentProps {
  phoneNumber: string;
  isFocused: boolean;
  loading: boolean;
  error: string;

  setIsFocused: (value: boolean) => void;

  handleContinue: () => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
