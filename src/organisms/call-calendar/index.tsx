import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  formatStartDate,
  formatEndDate,
  formatScheduleCalls,
  getFullCalendarView,
} from "./helper";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { useReadLocalStorage } from "usehooks-ts";
import { ViewApi } from "fullcalendar";

import styled from "@emotion/styled";
import { LocalDayjs } from "../../utils/timezoneService";
import { useSnackbar } from "notistack";
import { Call, Calls } from "../../pages/Call-calendar/type";
import CallDetailModal from "../../molecules/call-detail-modal";

const CalendarContainer = styled.div`
  @media (max-width: 600px) {
    .fc .fc-toolbar-title {
      font-size: 1.25em;
    }

    .fc .fc-button-group {
      font-size: 0.75rem;
    }
  }
`;

const MobileInfo = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: block;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2f498e;
    z-index: 100;
    color: white;
    padding: 4px 10px;
    text-align: center;
  }
`;

export default function CallCalendarDisplayer() {
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();
  const calendarRef = useRef<FullCalendar>(null);
  const timeZone = useReadLocalStorage<string | undefined>("timezone");
  const [startDate, setStartDate] = useState<string>(
    LocalDayjs().day(0).format("YYYY-MM-DD 00:00:00")
  );
  const [endDate, setEndDate] = useState<string>(
    LocalDayjs().day(6).format("YYYY-MM-DD 23:59:59")
  );

  const [callInfo, setCallinfo] = useState<Call>();

  const { data: rawCallDetails, formattedData: CallDetails } = useFetch<Calls>(
    APIRoutes.getCallsForDate +
      "?start_date=" +
      startDate +
      "&end_date=" +
      endDate + "&embed=YES",
    { setLoading, formatter: formatScheduleCalls }
  );

  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {};

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    if (!rawCallDetails) return;
    const clickedCall = Object.values(rawCallDetails).flat().find((call) => call.id === +clickInfo.event.id)

    if (clickedCall) {
      setCallinfo(clickedCall);
    }
  };

  useEffect(() => {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    const handleEventMouseEnter = (info: any) => {
      const eventTitle = info.event.title;
      info.el.title = eventTitle;
    };

    const handleEventMouseLeave = (info: any) => {
      info.el.removeAttribute("title");
    };

    calendarApi.on("eventMouseEnter", handleEventMouseEnter);
    calendarApi.on("eventMouseLeave", handleEventMouseLeave);

    return () => {
      calendarApi.off("eventMouseEnter", handleEventMouseEnter);
      calendarApi.off("eventMouseLeave", handleEventMouseLeave);
    };
  }, []);

  function resizer(arg: { view: ViewApi }) {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(getFullCalendarView());
  }

  function handleDateChange(start: Date, end: Date) {
    console.log("handleDateChange", start, end)
    setEndDate(formatEndDate(end));
    setStartDate(formatStartDate(start));
  }


  return (
    <Box sx={{ fontSize: "14px" }}>
      {
        callInfo && (
          <CallDetailModal
            callDetail={callInfo}
            open={Boolean(callInfo)}
            closeDialog={() => setCallinfo(undefined)}
          />
        )}
      <CalendarContainer>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
          // initialView="timeGridWeek"
          initialView={getFullCalendarView()}
          windowResize={resizer}
          slotEventOverlap={false}
          select={handleAddEventSelectAndOpenModal}
          eventClick={handleEditEventSelectAndOpenModal}
          // eventChange={handleUpdateEventSelect}
          events={CallDetails ? [...CallDetails] : []}
          longPressDelay={1000}
          eventLongPressDelay={1000}
          selectLongPressDelay={500}
          selectable={true}
          dayMaxEvents={true}
          allDaySlot={false}
          // editable={true}
          height="700px"
          headerToolbar={{
            left: "title",
            right: "prev,next",
          }}
          timeZone={timeZone ? timeZone : "local"}
          datesSet={({ start, end }) => handleDateChange(start, end)} // Add this line
        />
      </CalendarContainer>
    </Box>
  );
}
