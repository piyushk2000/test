import { createContext, useContext } from "react";
import { MyCalenderType } from "../../organisms/my-calendar/types";

export const MyCalenderContext = createContext<MyCalenderType | null>(null);

export const useMyCalenderContext = () => {
  const context = useContext(MyCalenderContext);

  if (!context) {
    throw new Error(
      "useMyCalenderContext must be used within a MyCalenderContextProvider"
    );
  }

  return context;
};
