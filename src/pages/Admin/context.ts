import { createContext, useContext } from "react";
import { SetDialogOpenTypes } from "./helper";

export type AdminContextTypes = {
  setDialogOpen: SetDialogOpenTypes;
};

export const AdminContext = createContext<AdminContextTypes | null>(null);

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdminContext must be used within a LoginContextProvider"
    );
  }

  return context;
};
