import { createContext, useContext } from "react";
import { MyCalenderFilterType } from "./type";

export const ProjectCalenderFilterContext =
  createContext<MyCalenderFilterType | null>(null);

export const useProjectCalenderFilterContext = () => {
  const context = useContext(ProjectCalenderFilterContext);

  if (!context) {
    throw new Error(
      "useProjectCalenderFilterContext must be used within a ProjectCalenderFilterContextProvider"
    );
  }

  return context;
};
