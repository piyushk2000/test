import { createContext, useContext } from "react";
import { ProfileSharedContextTypes } from "./types";

export const ProfileSharedContext =
  createContext<ProfileSharedContextTypes | null>(null);

export const useProfileSharedContext = () => {
  const context = useContext(ProfileSharedContext);

  if (!context) {
    throw new Error(
      "useProfileSharedContext must be used within a ProfileSharedContextProvider"
    );
  }

  return context;
};
