import { createContext, useContext } from "react";
import { CEMappingExpertContextType } from "./types";

export const CEMappingExpertContext = createContext<CEMappingExpertContextType | null>(null);

export const useCEMappingExpertContext = () => {
  const context = useContext(CEMappingExpertContext);

  if (!context) {
    throw new Error(
      "useCEMappingExpertContext must be used within a CEMappingExpertContextProvider"
    );
  }

  return context;
};
