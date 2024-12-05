import { Dispatch, SetStateAction, createContext } from "react";
import { MapMultipleProjectContextTypes, ProjectSelected } from "./types";
import { ProjectApiDataResponse } from "../../../pages/Projects/types";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { formatOpenProjectToLV } from "../../../common/formatData";
import { FieldValues, UseFormSetValue } from "react-hook-form";

export const MapMultipleProjectContext =
  createContext<MapMultipleProjectContextTypes>({
    projectOptions: [],
    setProjectOptions: null,
    selectedCards: [],
    projectSelected: null,
    setProjectSelected: null,
    setBackdrop: () => {},
  });

export const inputRow = {
  padding: "5px",
};

export const noExpertsSelectedStyle = {
  margin: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& p": {
    fonSize: "14px",
  },
};

export const hrStyles = { margin: "10px 0", opacity: "0.3" };

export const cancelBtnStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: "2rem",
  marginRight: "5px",
};

export const projectSelectText = {
  display: "flex",
  alignItems: "center",
  paddingRight: "5px",
  justifyContent: "flex-start",
  color: "rgb(236, 147, 36)",

  "& p": {
    fontSize: "14px",
    margin: "15px 0",
    textAlign: "end",
    marginRight: "30px",
    fontWeight: "600",
  },
};

export const arrowDownIconBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const getAdminProjects = async (
  setAdminProjects: Dispatch<SetStateAction<ProjectSelected[] | null>>,
  setValue: UseFormSetValue<FieldValues>,
  registerState?: string
) => {
  const payload = {
    page: 1,
    limit: 500,
    bookmarked: "NO",
    my_project: "YES",
    embed: "YES",
    equalto___status: "Open",
  };

  try {
    const response: ProjectApiDataResponse = await RequestServer(
      APIRoutes.projectsFilter,
      "POST",
      payload
    );

    const data = response.data.map(r => ({...r, topic: `ID: ${r.id}, Topic: ${r.topic}`}))

    const projects = formatOpenProjectToLV(response.data);

    // automatically selecting the project if there is only one project
    if (projects.length === 1) {
      setValue(registerState || "mapped_project", projects[0]);
    } 

    setAdminProjects(projects);
  } catch (err) {
    console.log(err);
  }
};
