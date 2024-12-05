import { Dayjs } from "dayjs";
import { APIRoutes } from "../../constants";
import { DateType, Filters } from "../../organisms/my-calendar/types";
import { isAdmin, isClient, isExpert } from "../../utils/role";

function getStartEndDate(date: Dayjs, type: "Week" | "Month") {
  let start_date, end_date;

  if (type === "Week") {
    start_date = date.startOf("week").day(0);
    // Calculate end date (next Saturday)
    end_date = start_date.add(6, "day");
  } else if (type === "Month") {
    // Calculate start date (1st day of the month)
    start_date = date.startOf("month");
    // Calculate end date (last day of the month)
    end_date = date.endOf("month");
  }

  return { start_date, end_date };
}

export function getApiUrl(filters: Filters, date: DateType) {
  let ApiUrl = APIRoutes.getCallsForDate;

  if (date) {
    if (filters.arrange_tag === "Day") {
      ApiUrl +=
        "?start_date=" +
        date?.startOf("d").format("YYYY-MM-DD") +
        "T00:00:00" +
        "&end_date=" +
        date?.endOf("d").format("YYYY-MM-DD") +
        "T23:59:59";
    } else {
      const { start_date, end_date } = getStartEndDate(
        date,
        filters.arrange_tag
      );
      ApiUrl +=
        "?start_date=" +
        start_date?.format("YYYY-MM-DD") + "T00:00:00" +
        "&end_date=" +
        end_date?.format("YYYY-MM-DD") + "T23:59:59" +
        "&arrange_by=" +
        filters.arrange_tag;
    }
  }

  /* FILTERS ---------------------------------------- */

  const { status, group, am, client, zoom_call , client_am,} = filters.sidebarFilters;
  const { search_by_expert } = filters;

  if (search_by_expert) {
    ApiUrl += "&search_by_expert=" + search_by_expert;
  }

  if (status) {
    ApiUrl += "&status=" + status;
  }

  if (group) {
    ApiUrl += "&fk_group=" + group;
  }

  if (am) {
    ApiUrl += "&account_manager=" + am;
  }

  if (client) {
    ApiUrl += "&client_contacts=" + client;
  }

  if (zoom_call) {
    ApiUrl += `&zoom_call=1`;
  }

  const loggedInExpertId = localStorage.getItem("expert_id");

  if (isExpert() && loggedInExpertId) {
    ApiUrl += "&in___fk_expert=" + loggedInExpertId;
  }

  if (client_am && isClient()) {
    ApiUrl += "&account_manager=" + client_am
  }

  /* ------------------------------------------------ */

  let isGroupNeeded = true;
  if (filters.tab === "groupedbyAM") {
    ApiUrl += "&groupedBy=AM";
  }

  return { ApiUrl, isGroupNeeded };
}

export const defaultFilters: Filters = {
  tab: isAdmin() ? "groupedbyAM" : "groupedbyPG",
  arrange_tag: "Day",
  isFilterChange: false,
  search_by_expert: "",
  isFilterApplied: false,
  calendarDate: null,
  sidebarFilters: {
    status: "Logged,Pending,Scheduled",
    group: null,
    am: null,
    client: null,
    zoom_call: false,
    client_am: null,
    expert_poc: null,
    zoom_slot: false,
  },
};

export const getDefaultFilters = (params: URLSearchParams): Filters => {

  return {
  tab: isAdmin() ? "groupedbyAM" : "groupedbyPG",
  arrange_tag: "Day",
  isFilterChange: false,
  search_by_expert: params.get("search_by_expert") || "",
  isFilterApplied: false,
  calendarDate: null,
  sidebarFilters: {
    status: params.get("status") || "Logged,Pending,Scheduled",
    group: params.get("group") || null,
    am: params.get("am") || null,
    client: params.get("client") || null,
    zoom_call: params?.get("zoom_call") === "1" ? true : false,
    client_am: params.get("client_am") || null,
    expert_poc: params.get("expert_poc") || null,
    zoom_slot: false
  },
};
}
