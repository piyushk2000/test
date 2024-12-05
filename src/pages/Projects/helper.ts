import { Dispatch, SetStateAction, createContext, useContext } from "react";
import isEqual from "lodash/isEqual";
import { RequestServer } from "../../utils/services";
import { APIRoutes, AppRoutes } from "../../constants";
import { getBookMarkedProjects } from "../../organisms/project-cards/helper";
import { getQuickFilterPayload } from "../../molecules/project-header/helper";
import {
  FormattedData,
  ProjectApiDataResponse,
  dialogTypes,
  filterPayload,
  projectApiDataItem,
  setDialogTypes,
} from "./types";
import { NavigateFunction } from "react-router-dom";
import { isAdmin, isClient } from "../../utils/role";

export const formatData = (data: any) => {
  let formattedData: FormattedData = [];
  if (data && data.length) {
    data.forEach((item: any) => {
      formattedData.push({
        label: item.name,
        value: item.id,
      });
    });
  }
  return formattedData;
};

export const setAddCEFormChange = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => {
    if (!prev.addCE.isChange) {
      return {
        ...prev,
        addCE: {
          ...prev.addCE,
          isChange: true,
        },
      };
    }

    return prev;
  });
};

export const getDomain = (level: any, list: any, parentId?: any) => {
  let arr: any = [];
  if (level === "L0") {
    list.forEach((item: any) => {
      if (item.level === level) {
        arr.push(item);
      }
    });
  } else if (level === "L1" || level === "L2" || level === "L3") {
    list.forEach((item: any) => {
      if (item.level === level && item.parent_id === parentId) {
        arr.push(item);
      }
    });
  }
  return arr;
};

export const handleClose = (setAlertBox: any) => {
  setAlertBox(true);
};

export const defaultDialogValues: dialogTypes = {
  addProject: { state: false, isChange: false },
  TAT: {state: false, apiData: null, expert_invitation_counts: {}},
  filter: {
    state: false,
    isChange: false,
  },
  addPE: {
    state: false,
    id: null,
    isChange: false,
    isProjectDetails: false,
    refetch: null,
    selectedExpert:null
  },
  addSPE: {
    state: false,
    id: null,
    isChange: false,
    isProjectDetails: false,
    refetch: null,
  },
  addCE: {
    state: false,
    id: null,
    isChange: false,
    mapped_project: null,
    refetch: null
  },
  editProject: { state: false, id: null, isChange: false, apiData: null },
  agenda: {
    state: false,
    openAddAgenda: () => {},
    project_id: null,
    isAgendaIdChanged: false,
    isAdminAllowed: false,
    isProjectOpen: false,
  },
  isAgendaDescription: {
    state: false,
    isChange: false,
    fk_agenda: null,
    agenda_responses: null,
    pe_id: null,
    isAdminAllowed: false,
    isProjectOpen: false,
  },
  logCall: {
    state: false,
    isChange: false,
    project_id: null,
    refetch: null,
    pe_id: null,
    expert_id: null,
    is_account_manager: false,
    is_group_admin: false
  },
  logExtension: {
    state: false,
    project_id: null,
    isChange: false,
    apiData: null,
  },
  logWorkStream: {
    state: false,
    project_id: null,
    isChange: false,
    apiData: null,
  },
  linkProject: {
    state: false,
    isChange: false,
    project_id: null,
    apiData: null,
  },
  delinkProject: {
    state: false,
    project_id: null,
    siblingProjects: null,
  },
  accManager: {
    state: false,
    acc_id: null,
  },
};

export const handleSubmitClose = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => defaultDialogValues);
};

export const openAddProjectDialog = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => ({
    ...prev,
    addProject: { state: true, isChange: false },
  }));
};

export const openFiltersDialog = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => ({
    ...prev,
    filter: { ...prev.filter, state: true },
  }));
};

export const handleAlertBoxClose = (setAlertBox: any) => {
  setAlertBox(false);
};

export const handleAlertBoxYesClick = (
  setAlertBox: any,
  setDialog: setDialogTypes
) => {
  setAlertBox(false);
  handleSubmitClose(setDialog);
};

export const handleFormChangeProject = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => {
    if (!prev.editProject.isChange) {
      prev.editProject.isChange = true;
      return prev;
    }

    return prev;
  });
};

export const handleFormChangeAddProject = (setDialog: setDialogTypes) => {
  setDialog((prev: dialogTypes) => {
    if (!prev.addProject.isChange) {
      prev.addProject.isChange = true;
      return prev;
    }

    return prev;
  });
};

export const handleFormChangeLogExtension = (setDialog: setDialogTypes) => {
  setDialog((prev) => {
    if (!prev.logExtension.isChange) {
      prev.logExtension.isChange = true;
      return prev;
    }

    return prev;
  });
};
export const handleFormChangeLogWorkStream = (setDialog: setDialogTypes) => {
  setDialog((prev) => {
    if (!prev.logWorkStream.isChange) {
      prev.logWorkStream.isChange = true;
      return prev;
    }

    return prev;
  });
};

export const handleFormChangeLinkProject = (setDialog: setDialogTypes) => {
  setDialog((prev) => {
    if (!prev.linkProject.isChange) {
      prev.linkProject.isChange = true;
      return prev;
    }

    return prev;
  });
};

export const ProjectContext = createContext<any>(null);

export const useProjectPageContext = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    return {
      apiData: null,
      setData: null,
      filterPayload: null,
      defaultFilterPayload: null,
      setFilterPayload: null,
      bookmarkedProjects: null,
      setBookmarkedProjects: null,
      setDialog: null,
      isDialog: false,
      filterFormRef: null,
      handleResetFilters: null,
    };
  }

  return context;
};

export const defaultFilterPayloadValues = (client_id: any, serviced: any, client_projects: any): filterPayload => ({
    dateFilter: null,
    sortFilter: isClient() ? "desc___receiving_date" : "desc___updated_at",
    advanceFilter: client_id ? { client_id } : null,
    search: null,
    search_by_id: null,
    rowsPerPage: 24,
    isFilterChange: false,
    quickFilter: serviced ? getQuickFilterPayload("Serviced") : null,
    projectLinkFilter: null,
    status:"",
    group:"",
    projectsFromClient: client_projects, // only use when we are redirecting from client's page to project page
    client_topic_search: null, // Only for Client Login
    client_case_code_search: null // Only for Client Login
  })

// Async function to get fetch the data from the api
export async function getAllProjects(
  currentPage: number,
  setData: any,
  filterPayload: filterPayload,
  setBookmarkedProjects: (b: projectApiDataItem[]) => void,
  setFilterPayload: Dispatch<SetStateAction<filterPayload>>,
  defaultFilterPayload: filterPayload,
  projectIds?: string | null
) {
  setData(null);

  if (isClient()) {
    await getProjectForClient(
      currentPage,
      setData,
      filterPayload,
      setFilterPayload
    );
    return;
  }

  try {
    const {
      dateFilter,
      sortFilter,
      advanceFilter,
      search,
      quickFilter,
      projectLinkFilter,
      projectsFromClient,
      rowsPerPage,
      search_by_id,
      client_case_code_search,
     
    } = filterPayload;
    let payload: any = {
      page: currentPage,
      limit: rowsPerPage,
      bookmarked: "NO",
      embed: "YES",
    };

    // Sort Filter Added
    if (sortFilter) {
      payload.sort_by = sortFilter;
    }

    // Date Filter Added
    if (dateFilter) {
      payload = { ...payload, ...dateFilter };
    }

    // Advance Filter
    if (advanceFilter) {
      payload = { ...payload, ...advanceFilter };
    }

    // Search Filter
    if (search) {
      payload = { ...payload, search };
    }

    // quick Filter
    if (quickFilter) {
      payload = { ...payload, ...quickFilter };
    }

    // search by project ID
    if (search_by_id) {
      payload = {...payload, equalto___id: search_by_id}
    }
    if (client_case_code_search) {
      payload = {...payload, like___case_code: client_case_code_search}
    }

    // Project Ids ( This is only happens When we are coming from expert cards page to project page to show projects of a particular Expert )
    // changing the limit to 200 so that all the projects at once for an expert and hiding pagination also if project Ids are there
    if (projectIds) {
      payload = { ...payload, in___id: projectIds, limit: 200 };
    }

    // Link Project Filter
    if (projectLinkFilter || projectsFromClient) {
      if (projectLinkFilter) {
        payload = { ...payload, in___id: projectLinkFilter };
      } else {
        payload = { ...payload, in___id: projectsFromClient };
      }
    }

    // showing only those project in which Admin is GROUP ADMIN, RA or AM
    if (isEqual(defaultFilterPayload, filterPayload) &&  isAdmin() && !projectIds) {
      payload = {...payload , my_project: "YES"}
    }

    const response = await RequestServer(
      APIRoutes.projectsFilter,
      "POST",
      payload
    );
    const apiData: ProjectApiDataResponse = response;
    const apiDataSorted: ProjectApiDataResponse | undefined =
      await getBookMarkedProjects(apiData, setBookmarkedProjects);
    if (apiDataSorted) {
      setData(apiDataSorted);
    } else {
      setData(apiData);
    }
  } catch (err) {
    console.error("Error Occurred", err);
  }
}

export async function getProjectForClient(
  currentPage: number,
  setData: any,
  filterPayload: filterPayload,
  setFilterPayload: any
) {
  try {
    let url = `${APIRoutes.projects}?page=${currentPage}&limit=${filterPayload.rowsPerPage}&bookmarked=NO&embed=YES`;

    const { sortFilter, advanceFilter, client_case_code_search, client_topic_search } = filterPayload;

    // Sort Filter Added
    if (sortFilter) {
      url += `&sort_by=${sortFilter}`;
    }

    if(filterPayload.status){
      url += `&status=${filterPayload.status}`;
    }

    if(filterPayload.group){
      url += `&fk_group=${filterPayload.group}`;
    }


    // ____ CLIENT FILTERS ___________________ //

    if (client_case_code_search) {
      url  += "&like___case_code=" + client_case_code_search;
    }

    if (client_topic_search) {
      url += "&like___external_topic=" + client_topic_search;
    }

    // _______________________________________ //


    // Advance Filter
    if (advanceFilter) {
      const filters = Object.entries(advanceFilter);

      for (let [key, value] of filters) {
        url += `&${key}=${value}`;
      }
    }

    const response = await RequestServer(url, "get");

    if (filterPayload.isFilterChange) {
      setFilterPayload((prev: filterPayload) => ({
        ...prev,
        isFilterChange: false,
      }));
    }

    setData(response);
  } catch (err) {
    console.log(err);
  }
}

export const dataRangeProjectFilter = (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
  setFilterPayload: any,
  filterPayload: filterPayload,
  navigate: NavigateFunction
) => {
  let dateFilter: object | null = null;
  const greaterThan = `greaterthanequalto___${calenderType}`;
  const lessThan = `lessthanequalto___${calenderType}`;

  if (select === "between") {
    const fromDate = date + "T00:00:00";
    const toDate = tDate + "T23:59:59";
    dateFilter = {
      [greaterThan]: fromDate,
      [lessThan]: toDate,
    };
  } else if (select === "before") {
    const beforeDate = date + "T23:59:59";
    dateFilter = {
      [lessThan]: beforeDate,
    };
  } else if (select === "on") {
    const fromDate = date + "T00:00:00";
    const toDate = date + "T23:59:59";
    dateFilter = {
      [greaterThan]: fromDate,
      [lessThan]: toDate,
    };
  } else if (select === "after") {
    const afterDate = date + "T00:00:00";
    dateFilter = {
      [greaterThan]: afterDate,
    };
  }

  let filterPayloadFinal: filterPayload = {
    ...filterPayload,
    dateFilter: null,
    isFilterChange: true,
  };

  if (dateFilter) {
    filterPayloadFinal = {
      ...filterPayload,
      dateFilter,
      isFilterChange: true,
    };
  }

  setFilterPayload((prev: any) => filterPayloadFinal);
  navigate(AppRoutes.PROJECTS + "/all?page=1");
};

export const getProjectErrorMsg = (msg: string) => {
  if (msg === "projects_topic_client_id must be unique") {
    return "Please enter a unique Subject for the project";
  } else {
    return msg;
  }
};
