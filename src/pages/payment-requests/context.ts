import { createContext, useContext } from "react";
import { PaymentRequestContextType } from "./types";

export const PaymentsRequestsContext = createContext<PaymentRequestContextType | null>(null);

export const usePaymentsRequestsContext = () => {
  const context = useContext(PaymentsRequestsContext);

  if (!context) {
    throw new Error(
      "usePaymentsRequestsContext must be used within a PaymentsRequestsContextProvider"
    );
  }

  return context;
};
