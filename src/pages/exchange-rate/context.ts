import { createContext, useContext } from "react";
import { ExchangeRateContextType } from "./types";

export const ExchangeRateContext = createContext<ExchangeRateContextType | null>(null);

export const useExchangeRateContext = () => {
  const context = useContext(ExchangeRateContext);

  if (!context) {
    throw new Error(
      "useExchangeRateContext must be used within a ExchangeRateContextProvider"
    );
  }

  return context;
};
