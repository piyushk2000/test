import { NavigateFunction } from "react-router-dom";
import { APIRoutes, AppRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import {
  SetAlertNBackdrop,
  SetFilterPayload,
  filterPayload,
  setDialogs,
} from "./types";
import { getTimeline } from "../../organisms/expert-profile/helper";
import { isAdmin, isClient, isExpert, isSuperAdmin } from "../../utils/role";
import { settingsConfigTypeOptions } from "../../utils/settings";

export const defaultFilterPayload: filterPayload = {
  dateFilter: null,
  typeFilter: null,
  sortFilter: (isSuperAdmin() || isAdmin())? "desc___updated_at" : "asc___name" ,
  advanceFilter: null,
  isFilterChange: false,
  rowsPerPage: 24,
  statusFilter: [],
  badgeFilter: [],
  searchFilter: null,
  pending_approvals: false,
  otherSearchFilter: {
    id: "",
    name: "",
    nick_name: "",
    email: "",
    mobile: "",
    headline: "",
    bio: "",
    functions: "",
    company: "",
    domain: "",
    work_division: ""
  },
  timelineFilters: {
    actor: null,
    action: null,
    date: null,
    filterAdded: false,
    isFilterChange: false,
  },
};

export const expertPageBoxStyle = {
  mt: 0,
  mb: 4,
  background: "#F5F4F4",
  paddingX: {
    xs: '8px', 
    sm: '8px', 
    md: '24px'
  },
  
};

export const handleClose = (
  isChange: boolean,
  setAlertNBackdrop: SetAlertNBackdrop,
  setDialogs: setDialogs
) => {
  return isChange
    ? handleAlertBoxOpen(setAlertNBackdrop)
    : handleSubmitClose(setDialogs);
};

export const handleSubmitClose = (setDialogs: setDialogs) => {
  setDialogs((prev) => ({
    addToStaging: false,
    addToProject: false,
    timelineFilters: false,
    timeline: {
      state: false,
      data: null,
      messages: null,
      id: null,
    },
  }));
};

export const getTimelineData = async (
  id: string,
  filters: filterPayload["timelineFilters"],
  setDialogs: setDialogs,
  setFilterPayload: SetFilterPayload
) => {
  const { date, action, actor } = filters;
  const { data, messages } = await getTimeline(id, date, action, actor);

  setDialogs((prev) => ({
    ...prev,
    timeline: {
      ...prev.timeline,
      data,
      messages,
    },
  }));

  setFilterPayload((prev) => {
    if (prev.timelineFilters.isFilterChange) {
      prev.timelineFilters.isFilterChange = false;
    }
    return prev;
  });
};

export const handleTimelineClose = (
  setFilterPayload: SetFilterPayload,
  setDialogs: setDialogs
) => {
  handleSubmitClose(setDialogs);
  setFilterPayload((prev) => ({
    ...prev,
    timelineFilters: {
      ...prev.timelineFilters,
      action: null,
      actor: null,
      date: null,
      isFilterChange: false,
      filterAdded: false,
    },
  }));
};

export const handleAlertBoxOpen = (setAlertNBackdrop: SetAlertNBackdrop) => {
  setAlertNBackdrop((prev) => ({
    ...prev,
    alert: true,
  }));
};

export const handleAlertBoxClose = (setAlertNBackdrop: SetAlertNBackdrop) => {
  setAlertNBackdrop((prev) => ({
    ...prev,
    alert: false,
  }));
};

export const handleAlertBoxYesClick = (
  setAlertNBackdrop: SetAlertNBackdrop,
  setDialogs: setDialogs
) => {
  handleAlertBoxClose(setAlertNBackdrop);
  handleSubmitClose(setDialogs);
};

export const dataRangeFilter = (
  date: Date | null,
  tDate: Date | null,
  select: string | null,
  calenderType: string | null,
  setFilterPayload: any,
  filterPayload: filterPayload,
  navigate: NavigateFunction,
  ce_mapping: string | null
) => {
  let dateFilter: object | null = null;
  let key: string | null = "";

  if (calenderType === "Tutorial completion") {
    key = "tutorial_taken_timestamp";
  } else {
    key = calenderType;
  }

  const greaterThan = `greaterthanequalto___${key}`;
  const lessThan = `lessthanequalto___${key}`;

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

  let filterPayloadFinal: filterPayload;

  if (dateFilter) {
    filterPayloadFinal = {
      ...filterPayload,
      dateFilter,
      isFilterChange: true,
    };
  } else {
    filterPayloadFinal = {
      ...filterPayload,
      dateFilter: null,
      isFilterChange: true,
    };
  }
  console.log("filter payload second", filterPayloadFinal);
  setFilterPayload(filterPayloadFinal);
  navigate(AppRoutes.EXPERT_SEARCH + "?page=1" + (ce_mapping ? "&ce_mapping=" + ce_mapping : "") );
};

export const setTypeFilter = (
  type: string,
  setFilterPayload: any,
  filterPayload: filterPayload,
  navigate: NavigateFunction,
  ce_mapping: string | null
) => {
  const filterPayloadFinal: filterPayload = {
    ...filterPayload,
    typeFilter: type,
    isFilterChange: true,
  };
  setFilterPayload((prev: filterPayload) => filterPayloadFinal);
  navigate(AppRoutes.EXPERT_SEARCH + "?page=1" + (ce_mapping ? "&ce_mapping=" + ce_mapping : ""));
};

type options = {
  label: string;
  value: String;
};

export async function getCompanies(search: string, type?: "current" | "past") {

  let url = type === "current" ?
    APIRoutes.currentCompanies :
    type === "past" ? APIRoutes.pastCompanies
      : APIRoutes.getCompanies
  
  const response = await RequestServer(
    url + "&search=" + encodeURIComponent(search),
    "GET"
  );
  if (response.success) {
    const companiesData: any = response?.data;
    const finalExpertData: options[] = [];

    companiesData.forEach((company: any) => {
      const label = company.label ? company.label : "null";
      finalExpertData.push({
        label: label,
        value: company.id,
      });
    });

    return finalExpertData;
  } else {
    return "";
  }
}

export async function addCompanies(name: string) {
  const payload = {
    type: "Company",
    label: name,
    sublabel: null,
  };

  const response = await RequestServer(APIRoutes.masters, "POST", payload);

  if (response.success) {
    return {
      label: response?.data?.label,
      value: response?.data?.id,
    };
  } else {
    return "";
  }
}

export function getExpertDefaultMode() {
  const user_settings = localStorage.getItem("user_settings");

  if(user_settings) {
    const settings = JSON.parse(user_settings);

    const modeSettings = settings.find((s: any) => s.config_type === settingsConfigTypeOptions.ExpertsTabDefaultView);

    if(modeSettings) {
      const mode = modeSettings.config_value.type;
      return mode;
    }
  }
  return "list"
}