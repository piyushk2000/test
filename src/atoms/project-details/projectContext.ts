import { createContext, useContext } from "react";
import { setModalState } from "../../organisms/project-detail/helper";

type ProjectContextType = {
  defaultValues: any;
  setDefaultValues: any;
  isLoading: any;
  setLoading: any;
  setModalOpen: setModalState | null;
  isAdminAllowed: boolean;
  stagedExperts:any;
  setStagedExperts:any;
};

export const ProjectDetailsContext = createContext<ProjectContextType | null>(
  null
);

export const useProjectDetailsContext = () => {
  const context = useContext(ProjectDetailsContext);

  if (!context) {
    return {
      defaultValues: null,
      setDefaultValues: null,
      isLoading: null,
      setLoading: null,
      setModalOpen: null,
      isAdminAllowed: false,
      stagedExperts:null,
      setStagedExperts:null
    };
  }

  return context;
};
