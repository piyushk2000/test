import { createContext, useContext } from "react";
import { BankDetailsContext } from "./helper";

export const BankContext = createContext<BankDetailsContext | null>(null);

export const useBankContext = () => {
  const context = useContext(BankContext);

  if (!context) {
    throw new Error(
      "useBankContext must be used within a BankContextProvider"
    );
  }

  return context;
};
