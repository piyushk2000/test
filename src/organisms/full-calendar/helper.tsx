import { isClient, isExpert } from "../../utils/role";
import {
  CalendarEvent,
  RawEvent,
  ScheduledCall,
  ScheduledCalls,
} from "./types";

interface ICreateEventCalendar {
  eventCalendar: {
    title: string;
    end: string;
    start: string;
    backgroundColor: string;
    textColor: string;
  };
}

export const createEventCalendar = async (data: ICreateEventCalendar) => {
  try {
    return data;
    // const response = await api.post(CREATE_EVENT_CALENDAR, data);
    // return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllEventsCalendar = async () => {
  try {
    return [];
    // const response = await api.get(GET_ALL_EVENTS_CALENDAR);
    // return response.data;
  } catch (err) {
    return err;
  }
};

interface IUpdateEventCalendar {
  eventCalendar: {
    _id: string;
    title: string;
    end: string;
    start: string;
    backgroundColor: string;
    textColor: string;
  };
}

export const updateEventCalendar = async (data: IUpdateEventCalendar) => {
  try {
    return data;
    // const response = await api.put(UPDATE_EVENT_CALENDAR, data);
    // return response.data;
  } catch (err) {
    return err;
  }
};

interface IDeleteEventCalendar {
  id: string;
}

export const deleteEventCalendar = async ({ id }: IDeleteEventCalendar) => {
  try {
    // const response = await api.delete(DELETE_EVENT_CALENDAR(id));
    // return response.data;
  } catch (err) {
    return err;
  }
};

export const colorMapCalendar = {
  Expert: "#B89B71",
  Client: "#5547BF",
  "Scheduled Call": "#ec9324",
  "Completed Call": "green"
};

export function getColorMapCalendar(){
  const newObject: Record<string, string>={...colorMapCalendar}

  if (isExpert()){
    newObject["Your slots"] = newObject.Expert; 
    delete newObject.Expert;  
  }

  if (isClient()){
    newObject["Your slots"] = newObject.Client; 
    delete newObject.Client;  
  }
  return newObject
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
        title: callData.title + `(${callData.fk_expert_value?.name})`,
        start: callData.scheduled_start_time,
        end: callData.scheduled_end_time,
        type: "Call",
        id: `${callData.id}`,
        backgroundColor: callData.status == 'Scheduled' ? colorMapCalendar["Scheduled Call"] : callData.status == 'Completed' || callData.status == 'Confirmed' || callData.status == 'Paid' || callData.status == 'Payment Requested' ? colorMapCalendar["Completed Call"] : 'white',
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


export function getFullCalendarView(){
   const width = window.innerWidth;

   if (width <= 600){
    return 'timeGridDay'
   }
   else{
    return "timeGridWeek"
   }
}