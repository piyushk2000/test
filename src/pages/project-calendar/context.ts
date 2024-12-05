import { createContext, useContext } from "react";
import { ProjectCalenderType } from "./type";

export const ProjectCalenderContext = createContext<ProjectCalenderType | null>(
  null
);

export const useProjectCalenderContext = () => {
  const context = useContext(ProjectCalenderContext);

  if (!context) {
    throw new Error(
      "useProjectCalenderContext must be used within a ProjectCalenderContextProvider"
    );
  }

  return context;
};
