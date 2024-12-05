import { createContext, useContext } from "react";
import { LoginContextType } from "./type";

export const LoginContext = createContext<LoginContextType | null>(null);

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error(
      "useLoginContext must be used within a LoginContextProvider"
    );
  }

  return context;
};
