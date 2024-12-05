import uuid from "react-uuid";
import { isClient, isExpert } from "../../utils/role";
import {
  CalendarEvent,
  RawEvent,
  ScheduledCall,
  ScheduledCalls,
} from "./types";
import { APIRoutes } from "../../constants";
import { ProjectCalendarFilters } from "../../pages/project-calendar/type";
import { Filters } from "../my-calendar/types";

const colorMapCalendar = {
  Expert: "#B89B71",
  Client: "#5547BF",
  "Scheduled Call": "#ec9324",
  "Completed Call": "green"
};

// Scheduled,Completed,Confirmed,Payment%20Requested,Paid

export function getCallsUrl(id: string | null, selectedExpert: string | null, filters: ProjectCalendarFilters) {

  const loggedIn_expert_id = localStorage.getItem("expert_id");

  return APIRoutes.getCalls +
    (id ? "?fk_project=" + id : "") +
    (selectedExpert ? "&fk_expert=" + selectedExpert : "") +
    (filters.status.length ? "&in___status=" + filters.status.join(",") : "") +
    (filters.client?.length ? "&in___client_participants=" + filters.client.map(c => c.value).join(",") : "") +
    (filters.myZoomCall ? "&notnull___zoom_meeting_id=" + "1" : "") +
    (isClient() ? "&showAM=1" : "") +
    (filters.am?.length ? "&in___account_manager=" + filters.am.map((a) => a.value).join(",") : "") +
    ((isExpert() && loggedIn_expert_id) ? "&in___fk_expert=" + loggedIn_expert_id : "")
}

export function getCallsUrlClient(startDate: string, endDate: string, filters: Filters) {

  return APIRoutes.getCallsForDate +
    "?start_date=" +
    startDate +
    "&end_date=" +
    endDate + "&embed=YES";
}

export function getColorMapCalendar() {
  const newObject: Record<string, string> = { ...colorMapCalendar };

  if (isExpert()) {
    newObject["Your slots"] = newObject.Expert;
    delete newObject.Expert;
    // delete newObject.Client;
  }

  if (isClient()) {
    newObject["Your slots"] = newObject.Client;
    delete newObject.Client;
  }
  return newObject;
}

export function formatData(data: RawEvent[]): CalendarEvent[] {
  if (!data) return [];
  return data.map(formatSingleEvent);
}

export function formatSingleEvent(event: RawEvent): CalendarEvent {
  return {
    title: event.participant_name,
    start: event.start_time,
    end: event.end_time,
    type: event.type,
    id: `${event.id}`,
    backgroundColor:
      event.type == "Client"
        ? colorMapCalendar["Client"]
        : colorMapCalendar["Expert"],
  };
}

export function formatScheduleCalls(calls: ScheduledCalls): CalendarEvent[] {
  if (!calls) return [];

  return Object.values(calls).reduce(
    (formattedData: CalendarEvent[], currentCall) => {
      const currentCallData = currentCall.map((callData) => ({
        title: callData.title
          ? `${callData.title} (${callData.fk_expert_value?.name})`
          : callData.fk_expert_value?.name,
        start: callData.scheduled_start_time,
        end: callData.scheduled_end_time,
        type: "Call",
        id: `${callData.id}`,
        backgroundColor: callData.status == 'Scheduled' ? colorMapCalendar["Scheduled Call"] : callData.status == 'Completed' || callData.status == 'Confirmed' || callData.status == 'Paid' || callData.status == 'Payment Requested' ? colorMapCalendar["Completed Call"] : 'white',
        zoom_meeting_id: callData.zoom_meeting_id
      }));

      return [...formattedData, ...currentCallData];
    },
    []
  );
}

export function getCallFromId(
  calls: ScheduledCalls | null,
  id: number
): ScheduledCall | undefined {
  if (!calls) return undefined;
  const flattenderData = Object.values(calls).flat();
  return flattenderData.find((callData) => callData.id === id);
}

export function getFullCalendarView() {
  const width = window.innerWidth;

  if (width <= 600) {
    return "timeGridDay";
  } else {
    return "timeGridWeek";
  }
}

export function getOverlappingDurations(events: CalendarEvent[] | null): CalendarEvent[] {

  if (isClient() || isExpert()) return [];
  if (!events) return [];
  const clientEvents = events.filter(event => event.type === "Client").map(event => ({ ...event, startTime: new Date(event.start), endTime: new Date(event.end) }));
  const expertEvents = events.filter(event => event.type === "Expert").map(event => ({ ...event, startTime: new Date(event.start), endTime: new Date(event.end) }));

  const overlappingDurations: CalendarEvent[] = [];

  clientEvents.forEach(clientEvent => {
    expertEvents.forEach(expertEvent => {
      if (clientEvent.startTime < expertEvent.endTime && expertEvent.startTime < clientEvent.endTime) {

        const start = clientEvent.startTime > expertEvent.startTime ? clientEvent.start : expertEvent.start;
        const end = clientEvent.endTime > expertEvent.endTime ? expertEvent.end : clientEvent.end;;
        overlappingDurations.push({ start, end, backgroundColor: "#114232", id: uuid(), type: "suggested_slot", title: "Suggested Slots", clientEvent, expertEvent });
      }
    })
  })

  return overlappingDurations;
}
