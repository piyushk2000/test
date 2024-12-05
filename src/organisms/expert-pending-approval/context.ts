import { createContext, useContext } from "react";
import { ExpertPendingApprovalsContextType } from "./type";

export const ExpertPendingApprovalsContext =
  createContext<ExpertPendingApprovalsContextType | null>(null);

export const useExpertPendingApprovalsContext = () => {
  const context = useContext(ExpertPendingApprovalsContext);

  if (!context) {
    throw new Error(
      "useExpertPendingApprovalsContext must be used within a ExpertPendingApprovalsContextProvider"
    );
  }

  return context;
};
