import { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";

interface GlobalLoadingContextType {
  show: () => void;
  hide: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | null>(null);

export function GlobalLoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  return (
    <GlobalLoadingContext.Provider value={{ show, hide }}>
      {children}
      {loading && <Loading />}
    </GlobalLoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const ctx = useContext(GlobalLoadingContext);
  if (!ctx) {
    throw new Error("useGlobalLoading must be used inside GlobalLoadingProvider");
  }
  return ctx;
}
