import { createContext, useContext } from "react";
import { PaymentsContextType } from "./types";

export const PaymentsContext = createContext<PaymentsContextType | null>(null);

export const usePaymentsContext = () => {
  const context = useContext(PaymentsContext);

  if (!context) {
    throw new Error(
      "usePaymentsContext must be used within a PaymentsContextProvider"
    );
  }

  return context;
};
