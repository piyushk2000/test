import { createContext } from "react";

interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<SidebarContextType | undefined>(undefined);
