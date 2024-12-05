import { createContext, useContext } from "react";
import { CETrackerContextType } from "./type";

export const CETrackerContext = createContext<CETrackerContextType | null>(null);

export const useCETrackerContext = () => {
  const context = useContext(CETrackerContext);

  if (!context) {
    throw new Error(
      "useCETrackerContext must be used within a CETrackerContextProvider"
    );
  }

  return context;
};
