import { Dayjs } from "dayjs";
import { LocalDayjs } from "../../utils/timezoneService";
import { statusFilter } from "../my-calendar/helper";
import { Filters, MyCall, MyCalls } from "../my-calendar/types";
import { isClient, isExpert } from "../../utils/role";
import { AppRoutes } from "../../constants";

const colorMap = [
  { titleColor: "#B89B71", componentColor: "#B89B71" },

  { titleColor: "#9F8C8A", componentColor: "#9F8C8A" },

  { titleColor: "#797B3A", componentColor: "#797B3A" },

  { titleColor: "#6371BF", componentColor: "#6371BF" },

  { titleColor: "#0F738E", componentColor: "#0F738E" },
];

export function getBoxColor(index: number) {
  return colorMap[index % colorMap.length];
}

export function getCallColor(call: MyCall | null) {
  if (!call) return { status: null, color: null };

  let ALL_STATUS_COLOR = {
    LOGGED: "Green",
    PENDING: "Blue",
    SCHEDULED: "#ec9324"
  };

  const call_start_time = call.scheduled_start_time;
  const today = LocalDayjs(new Date());
  const status = call.status;

  if (status === "Scheduled" && call_start_time) {
    if (today.isBefore(LocalDayjs(call_start_time))) {
      return { status: "Scheduled", color: ALL_STATUS_COLOR.SCHEDULED }
    } else {
      return { status: "Pending", color: ALL_STATUS_COLOR.PENDING }
    }
  }

  return { status: "Logged", color: ALL_STATUS_COLOR.LOGGED };
}

export const getTime = (callData: MyCall) => {
  const start_time = LocalDayjs(callData.scheduled_start_time);
  const end_time = LocalDayjs(callData.scheduled_end_time);

  return { start_time, end_time };
}

export const getDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
]
export function getInitial(status: string) {
  switch (status) {
    case "Logged":
      return "L";
    case "Pending":
      return "P";
    case "Scheduled":
      return "S";
    default:
      return "";
  }
}
export const formatMonthDayCall = (calls: MyCall[]) => {

  let Scheduled = 0;
  let Pending = 0;
  let Logged = 0;

  for (let call of calls) {
    const { status } = getCallColor(call);

    switch (status) {
      case "Scheduled": {
        Scheduled++;
        break;
      }
      case "Pending": {
        Pending++;
        break;
      }
      case "Logged": {
        Logged++;
        break;
      }
    }

  }

  let call_details = (isClient() || isExpert()) ?
    [
      {
        status: statusFilter()[1].label,
        color: statusFilter()[1].color,
        calls: Logged,
      },
      {
        status: statusFilter()[2].label,
        color: statusFilter()[2].color,
        calls: Pending + Scheduled,
      }
    ] :
    [
      {
        status: statusFilter()[0].label,
        color: statusFilter()[0].color,
        calls: Logged,
      },
      {
        status: statusFilter()[1].label,
        color: statusFilter()[1].color,
        calls: Pending,
      },
      {
        status: statusFilter()[2].label,
        color: statusFilter()[2].color,
        calls: Scheduled,
      }
    ]
  return call_details;
}

export const getCallDetailsArr = (callDetails: MyCalls) => {
  const callDetailsArr = Object.entries(callDetails);

  const firstDate = callDetailsArr[0][0];

  const firstDateDay = LocalDayjs(firstDate).day();

  const empty: [string, MyCall[]] = ["", []];

  if (firstDateDay === 1) {
    return callDetailsArr
  } else {
    switch (firstDateDay) {
      case 0: {
        callDetailsArr.unshift(...Array.from({ length: 6 }, () => empty));
        break;
      }
      case 2: {
        callDetailsArr.unshift(...Array.from({ length: 1 }, () => empty));
        break;
      }
      case 3: {
        callDetailsArr.unshift(...Array.from({ length: 2 }, () => empty));
        break;
      }
      case 4: {
        callDetailsArr.unshift(...Array.from({ length: 3 }, () => empty));
        break;
      }
      case 5: {
        callDetailsArr.unshift(...Array.from({ length: 4 }, () => empty));
        break;
      }
      case 6: {
        callDetailsArr.unshift(...Array.from({ length: 5 }, () => empty));
        break;
      }
    }

    return callDetailsArr
  }
}

export function getCalenderLink(filters: Filters, current_date: string | null) {

  const use_filters: any = {
    ...filters,
    date: current_date || "",
    status: filters.sidebarFilters.status || "",
    group: filters.sidebarFilters.group || "",
    am: filters.sidebarFilters.am || "",
    client: filters.sidebarFilters.client || "",
    zoom_call: filters.sidebarFilters.zoom_call ? "1" : "0",
    client_am: filters.sidebarFilters.client_am || "",
    expert_poc: filters.sidebarFilters.expert_poc || ""
  }

  delete use_filters.isFilterChange;
  delete use_filters.isFilterApplied;
  delete use_filters.calendarDate;
  delete use_filters.sidebarFilters;

  const filters_param = new URLSearchParams(use_filters as any);

  let link = `${AppRoutes.MY_CALENDAR}?filters=${filters_param.toString()}`;
  return link;
}