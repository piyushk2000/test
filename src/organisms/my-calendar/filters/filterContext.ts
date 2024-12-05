import { createContext, useContext } from "react";
import { MyCalenderFilterType } from "../types";

export const MyCalenderFilterContext =
  createContext<MyCalenderFilterType | null>(null);

export const useMyCalenderFilterContext = () => {
  const context = useContext(MyCalenderFilterContext);

  if (!context) {
    throw new Error(
      "useMyCalenderFilterContext must be used within a MyCalenderFilterContextProvider"
    );
  }

  return context;
};
