import { createContext, useContext } from "react";
import { ComplianceApprovalType } from "./type";

export const ComplianceApprovalContext = createContext<ComplianceApprovalType | null>(null);

export const useComplianceApproval = () => {
  const context = useContext(ComplianceApprovalContext);

  if (!context) {
    throw new Error(
      "useComplianceApproval must be used within a ComplianceApprovalProvider"
    );
  }

  return context;
};
