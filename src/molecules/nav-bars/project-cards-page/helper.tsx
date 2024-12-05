import { filterPayload } from "../../../pages/Projects/types";

export const calenderDialogTitles = [
  { label: "Received On", value: "receiving_date" },
  { label: "Created On", value: "created_at" },
  { label: "Updated On", value: "updated_at" },
];

export const calenderLabel = (type: any) => {
  switch (type) {
    case "updated_at": {
      return "Updated: ";
    }
    case "receiving_date": {
      return "Received: ";
    }
    case "created_at": {
      return "Created: ";
    }
    default: {
      return "Updated: ";
    }
  }
};

export const changeStateArr = [
  { label: <p> -- Select -- </p>, value: "" },
  {
    label: <p> Open Projects </p>,
    value: "open",
  },
  {
    label: <p> Close Projects </p>,
    value: "close",
  },
];

export const sortByClients = [
  {
    label: <p>Received On ( New &rarr; Old )</p>,
    value: "desc___receiving_date",
  },
  {
    label: <p>Received On ( Old &rarr; New )</p>,
    value: "asc___receiving_date",
  },
];

export const SortBy = [
  {
    label: <p>Topic ( A &rarr; Z )</p>,
    value: "asc___topic",
  },
  {
    label: <p>Topic ( Z &rarr; A )</p>,
    value: "desc___topic",
  },
  {
    label: <p>Client Name ( A &rarr; Z )</p>,
    value: "asc___client_name",
  },
  {
    label: <p>Client Name ( Z &rarr; A )</p>,
    value: "desc___client_name",
  },
  ...sortByClients,
  { label: <p>Added On ( New &rarr; Old )</p>, value: "desc___created_at" },
  { label: <p>Added On ( Old &rarr; New )</p>, value: "asc___created_at" },
  { label: <p>Updated On ( New &rarr; Old )</p>, value: "desc___updated_at" },

  { label: <p>Updated On ( Old &rarr; New )</p>, value: "asc___updated_at" },
];

export const calenderOpenClickHandler = (setCalender: any) =>
  setCalender((prev: any) => ({
    ...prev,
    open: true,
    type: prev.type || "updated_at",
  }));

export const calenderCloseClickhandler = (setCalender: any) =>
  setCalender((prev: any) => ({
    value: "",
    open: false,
    type: null,
  }));

export const clientQuickFilterOption = [
  "Serviced",
  "Unserviced",
  "Profiles Shared",
];

export const quickFilterOption = [...clientQuickFilterOption, "CE Done"];

export const getNavbarFilters = (filterPayload: filterPayload): Partial<filterPayload> => ({
  sortFilter: filterPayload.sortFilter,
  quickFilter: filterPayload.quickFilter,
  dateFilter: filterPayload.dateFilter
})

const quickFilterMap: Record<string, string> = {
  Serviced: "greaterthan___total_revenue",
  Unserviced: "equalto___total_revenue",
  "Profiles Shared": "greaterthan___profile_shared",
  "CE Done": "greaterthan___ce_done",
};

export const getQuickFilterValueFromPayload = (payload: Object) => {
  const payloadKey = Object.keys(payload)[0];
  const quickFilter = Object.keys(quickFilterMap).find(
    (k) => quickFilterMap[k] === payloadKey
  );
  return quickFilter || "";
};

export const getQuickFilterPayload = (filter: string) => {
  if (quickFilterMap[filter]) {
    return {
      [quickFilterMap[filter]]: 0,
    };
  } else {
    return {};
  }
};
