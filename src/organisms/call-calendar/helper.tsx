import { Calls } from "../../pages/Call-calendar/type";
import { LocalDayjs } from "../../utils/timezoneService";
 interface CalendarEvent  {
  title: string;
  start: string;
  end: string;
  type: string;
  id: string;
  backgroundColor: string;
}
export const colorMapCalendar = {
  Expert: "#B89B71",
  Client: "#5547BF",
  "Scheduled Call": "#ec9324",
  "Completed Call": "green"
};

export function formatScheduleCalls(calls: Calls): CalendarEvent[] {
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


export function getFullCalendarView(){
   const width = window.innerWidth;

   if (width <= 600){
    return 'timeGridDay'
   }
   else{
    return "timeGridWeek"
   }
}

export function formatStartDate(date:Date | string ){
  return LocalDayjs(date).format("YYYY-MM-DD 00:00:00")
}
export function formatEndDate(date:Date | string ){
  return LocalDayjs(date).subtract(1, "day").format("YYYY-MM-DD 23:59:59")
}
