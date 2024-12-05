import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ModalInfosEventCalendar } from "./Modal";
import {
  formatData,
  formatScheduleCalls,
  getCallFromId,
  getFullCalendarView,
} from "./helper";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { useReadLocalStorage } from "usehooks-ts";
import { ScheduledCall } from "./types";
import CallDetailModal from "../../molecules/call-detail-modal";
import { ViewApi } from "fullcalendar";

import styled from "@emotion/styled";
import { LocalDayjs } from "../../utils/timezoneService";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { isClient, isExpert } from "../../utils/role";

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

type Props = {
  id: string | null;
  projectDetails: any;
  selectedExpert: string | null;
};

export default function CalendarScheduler({
  id,
  projectDetails,
  selectedExpert,
}: Props) {
  const { setLoading } = useFullPageLoading();
  const not_show_calls = useGetParams("not_show_calls");
  const clientId = projectDetails ? (projectDetails[0].client_id || localStorage.getItem("client_id")) : "";
  const { formattedData: EventData, refetch } = useFetch(
    `${APIRoutes.plan}?fk_project=${id}&type=Client,Expert${(selectedExpert ? "&in___participant_id=" + `${selectedExpert},${clientId}` : "")}`,
    { setLoading, formatter: formatData, disabled: (isExpert() ? false: (!clientId) ) }
  );
  const { formattedData: CallsData, data: rawCallData } = useFetch(
    APIRoutes.getCalls +
      "?fk_project=" +
      id +
      (selectedExpert ? "&fk_expert=" + selectedExpert : ""),
    { setLoading, formatter: formatScheduleCalls, disabled: !!not_show_calls }
  );

  const timeZone = useReadLocalStorage<string | undefined>("timezone");
  const { enqueueSnackbar } = useSnackbar();

  const [eventInfos, setEventInfos] = useState();
  const [callInfo, setCallinfo] = useState<ScheduledCall>();
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  const {
    value: modalOpen,
    setTrue: handleOpen,
    setFalse: handleClose,
  } = useBoolean(false);

  const {
    value: callDetailModalOpen,
    setTrue: handleOpenCallDetail,
    setFalse: handleCloseCallDetail,
  } = useBoolean(false);

  const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
    if (LocalDayjs().isAfter(LocalDayjs(selectInfo.end))) {
      enqueueSnackbar("Can't add past availability. ", {
        variant: "warning",
      });
      return false;
    }
    setIsEditCard(false);
    setEventInfos(selectInfo);
    handleOpen();
  };

  const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
    if (clickInfo.event.extendedProps.type === "Call") {
      const clickedCall = getCallFromId(rawCallData, +clickInfo.event.id);
      if (clickedCall) {
        setCallinfo(clickedCall);
        handleOpenCallDetail();
      }
      return;
    }

    if ((isClient() && clickInfo.event.extendedProps.type === "Expert") || (isExpert() && clickInfo.event.extendedProps.type === "Client")) {
      setIsEditCard(false);
      setEventInfos(clickInfo.event);
      handleOpen();
      return;
    };
    setIsEditCard(true);
    setEventInfos(clickInfo);
    handleOpen();
  };

  const calendarRef = useRef<FullCalendar>(null);

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

  useEffect(() => {
    if (EventData && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      let minDate:any = null;
      const nowDate = LocalDayjs();
      EventData.forEach((event) => {
        if ( event.type==="Expert" &&nowDate.isBefore(event.start)) {
          if (minDate && minDate.isBefore(event.start)) return;
          minDate = LocalDayjs(event.start);
        }
      });

      if (minDate){
        calendarApi.gotoDate(minDate.toDate());
      }
    }
  }, [JSON.stringify(EventData)]);

  function resizer(arg: { view: ViewApi }) {
    if (!calendarRef.current) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(getFullCalendarView());
  }

  return (
    <Box sx={{ fontSize: "14px" }}>
      <ModalInfosEventCalendar
        open={modalOpen}
        handleClose={handleClose}
        eventInfos={eventInfos}
        isEditCard={isEditCard}
        refetch={refetch}
        projectId={id}
        projectDetails={projectDetails}
      />

      {callInfo && (
        <CallDetailModal
          callDetail={callInfo}
          open={callDetailModalOpen}
          closeDialog={handleCloseCallDetail}
        />
      )}

      <CalendarContainer>
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
          // initialView="timeGridWeek"
          initialView={getFullCalendarView()}
          slotEventOverlap={false}
          windowResize={resizer}
          select={handleAddEventSelectAndOpenModal}
          eventClick={handleEditEventSelectAndOpenModal}
          // eventChange={handleUpdateEventSelect}
          events={
            EventData && (!!not_show_calls || CallsData) ? [...EventData, ...(CallsData || [])] : undefined
          }
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
          eventContent={renderEventContent}
        />
      </CalendarContainer>
      <MobileInfo>
        <Typography>👉🏻 Long Press on any time-slot</Typography>
      </MobileInfo>
    </Box>
  );
}

function renderEventContent(eventInfo: any) {
  return {
    html: `
      <div class="fc-event-time">${eventInfo.timeText} (IST)</div>
      <div class="fc-event-title-container">
        <div class="fc-event-title fc-sticky">
        ${eventInfo.event.title}
        </div>
      </div>
    `
  };
}

