import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../constants";
import {
  ProjectApiDataResponse,
  projectApiDataItem,
} from "../../pages/Projects/types";
import { RequestServer } from "../../utils/services";

export interface alertBox {
  isAlert: boolean;
  id: number | undefined;
}

export type SelectedCards = {
  label: string;
  value: number;
  client_name: string;
  acc_manager: string;
};

export type Select = {
  isClicked: boolean;
  selectedCards: SelectedCards[];
  isAccManagerDialog: {
    state: boolean;
    allAccManagers: { label: string; value: number }[] | null;
  };
};

export type SetSelect = Dispatch<SetStateAction<Select>>;

// Function to know whether a specific project is bookmarked for not
export function isBookmarked(
  id: number,
  bookmarkedProjects: projectApiDataItem[]
) {
  return Boolean(bookmarkedProjects.find((project) => project.id === id));
}

export function projectApiDataSort(
  apiData: ProjectApiDataResponse,
  bookmarkedProjects: projectApiDataItem[]
) {
  // if apiData is not empty
  if (apiData) {
    // setting value of isBookmarked variable
    apiData.data.forEach((project: any) => {
      project.isBookmarked = isBookmarked(project.id, bookmarkedProjects);
    });

    // sorting the projects , showing bookmarked project first
    apiData.data.sort((a: any, b: any) => {
      if (a.isBookmarked === b.isBookmarked) {
        return 0; // remain unchanged
      }

      return a.isBookmarked ? -1 : 1; // if a.isBookmarked is a truthy value, put it first before b
    });
  }

  return apiData;
}

export const getBookMarkedProjects = async (
  apiData: ProjectApiDataResponse,
  setBookmarkedProjects: (data: projectApiDataItem[]) => void
) => {
  try {
    const response = await RequestServer(APIRoutes.projectWorkspace, "get");
    if (response.success) {
      const data: projectApiDataItem[] = response.data;
      setBookmarkedProjects(data);
      return projectApiDataSort(apiData, data);
    } else {
      return apiData;
    }
  } catch (err) {
    console.error("Error Occurred", err);
  }
};

export async function patchBookMarkedProjects(
  action: string,
  projectId: number | undefined,
  setBackdrop: (b: boolean) => void,
  setBookmarkedProjects: (data: projectApiDataItem[]) => void,
  bookmarkedProjects: projectApiDataItem[],
  apiData: ProjectApiDataResponse,
  setData: (data: ProjectApiDataResponse) => void
) {
  try {
    setBackdrop(true);
    const body = {
      action,
      projectId,
    };
    const response = await RequestServer(
      APIRoutes.projectWorkspace,
      "PATCH",
      body
    );

    if (response.success) {
      if (action === "Remove") {
        const newBookmarkedProjects: projectApiDataItem[] =
          bookmarkedProjects.filter(
            (project: projectApiDataItem) => project.id !== projectId
          );
        setBookmarkedProjects(newBookmarkedProjects);
        const apiDataSorted: ProjectApiDataResponse = projectApiDataSort(
          apiData,
          newBookmarkedProjects
        );
        setData(apiDataSorted);
      } else if (action === "Add") {
        const currentProject: projectApiDataItem | undefined =
          apiData?.data.find(
            (project: projectApiDataItem) => project.id === projectId
          );

        if (currentProject) {
          const newBookmarkedProjects: projectApiDataItem[] = [
            ...bookmarkedProjects,
            currentProject,
          ];
          setBookmarkedProjects(newBookmarkedProjects);
          const apiDataSorted: ProjectApiDataResponse = projectApiDataSort(
            apiData,
            newBookmarkedProjects
          );
          setData(apiDataSorted);
        }
      }
    }
  } catch (err) {
    console.error("Error Occurred", err);
  } finally {
    setBackdrop(false);
  }
}

export const getAdminUsers = async (setState: any) => {
  try {
    const response = await RequestServer(APIRoutes.adminUsers, "get");

    if (response.success) {
      const data = response.data.map((u: any) => ({
        label: u.name,
        value: u.id,
      }));
      setState(data);
    }
  } catch (err) {
    console.log(err);
  }
};
