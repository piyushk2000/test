import { useContext } from "react";
import { Context } from "../../pages/Layout/context";

export function useSidebar() {
    const context = useContext(Context);
    if (!context) {
      throw new Error('useBoolean must be used within a BooleanProvider');
    }
    return context;
  }