import { APIRoutes } from "../../../constants";
import { projectApiDataItem } from "../../../pages/Projects/types";
import { RequestServer } from "../../../utils/services";
import { SetFormOptions } from "./types";

export const getFormOptions = async (
  setFormOptions: SetFormOptions,
  projectDetails: projectApiDataItem | null
) => {
  if (!projectDetails) return;

  setFormOptions((prev) => ({
    linkProject: [],
    loading: true,
  }));

  try {
    const response = await RequestServer(
      APIRoutes.projects + "?client_id=" + projectDetails.client_id,
      "GET"
    );

    const data: projectApiDataItem[] = response.data;
    const sibling_projects: number[] = projectDetails.sibling_projects
      ? projectDetails.sibling_projects?.map((project) => parseInt(project))
      : [];
    const filtered_data = data
      .filter((project) => {
        // exclude the current project
        if (project.id === projectDetails.id) return false;

        const curr_project = sibling_projects.find((id) => id === project.id);

        return curr_project ? false : true;
      })
      .map((project) => ({ label: project.topic, value: project.id }));

    console.log(
      "Sibling Projects",
      sibling_projects,
      "Projects",
      filtered_data
    );

    setFormOptions((prev) => ({
      loading: false,
      linkProject: filtered_data,
    }));
  } catch (err) {
    console.log(err);
  }
};
