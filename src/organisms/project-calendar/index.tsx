import {
  Ref,
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridMonthPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ModalInfosEventCalendar } from "./Modal";
import {
  formatData,
  getCallFromId,
  getFullCalendarView,
  getOverlappingDurations,
} from "./helper";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { useFetch } from "../../utils/hooks/useFetch";
import { APIRoutes } from "../../constants";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { useReadLocalStorage } from "usehooks-ts";
import { CalendarEvent, ScheduledCall, ScheduledCalls } from "./types";
import CallDetailModal from "../../molecules/call-detail-modal";
import { ViewApi } from "fullcalendar";
import { LocalDayjs } from "../../utils/timezoneService";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { isClient, isExpert, isSuperAdmin } from "../../utils/role";
import { CalendarContainer, MobileInfo } from "./StylesComponents";
import { styles } from "./styles";
import { useProjectCalenderContext } from "../../pages/project-calendar/context";
import DialogModal from "../../atoms/dialog";
import ScheduleCall from "../project/project-pe-mapping/actions/schedule-call";
import { Dayjs } from "dayjs";


type Props = {
  experts: any[] | null;
  id: string | null;
  projectDetails: any;
  selectedExpert: string | null;
  openFilters: () => void;
  showFilters: boolean;
  CallsData: CalendarEvent[] | null;
  rawCallData: ScheduledCalls | null;
  ref: RefObject<{
    setCalendarDate: (date: Date) => void;
    getCalendarDate: () => Date;
  }>;
};

const ProjectCalendar = forwardRef(
  (
    { experts, id, projectDetails, selectedExpert, showFilters, openFilters, CallsData, rawCallData }: Props,
    ref
  ) => {
    const calendarRef = useRef<FullCalendar>(null);
    const { setLoading } = useFullPageLoading();
    const { setFiltersWithKey, filters, refetchCallDetails , openLogCallDialog} = useProjectCalenderContext();
    const not_show_calls = useGetParams("not_show_calls");
    const clientId = projectDetails
      ? projectDetails[0].client_id || localStorage.getItem("client_id")
      : "";
    const { formattedData: FormattedEventData, refetch } = useFetch(
      `${APIRoutes.plan}?fk_project=${id}&type=Client,Expert`,
      {
        setLoading,
        formatter: formatData,
        disabled: isExpert() ? false : !clientId,
      }
    );
    const [EventData, setEventData] = useState(FormattedEventData);

    const timeZone = useReadLocalStorage<string | undefined>("timezone");
    const { enqueueSnackbar } = useSnackbar();

    const [eventInfos, setEventInfos] = useState();
    const [todayText, setTodayText] = useState('Today');
    const [scheduleDialogOpen, setscheduleDialogOpen] = useState(false);
    const [expert, setExpert] = useState<{ value: number, label: string } | null>(null)
    const [time, setTime] = useState<Dayjs>()
    const [duration, setDuration] = useState<number>()
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

    const date = filters.date?.toDate();

    const [totalCallInrange, setTotalCallInrange] = useState(0);
    const [availableCalls, setAvailableCalls] = useState<any[]>([]);

    useEffect(() => {
      if (!calendarRef.current) return;
      if (!CallsData) return;
      const calendarApi = calendarRef.current.getApi();
      const start = calendarApi.view.currentStart;
      const end = calendarApi.view.currentEnd;

      const callsInRange = CallsData.filter((call) => {
        const callDate = new Date(call.start); // replace 'date' with the actual property name
        return callDate >= start && callDate < end;
      });

      setTotalCallInrange(callsInRange.length);
    }, [date]);

    useEffect(() => {
      if (filters.showAvailablity) {
        setAvailableCalls([...(CallsData || [])])
        setEventData(FormattedEventData);
      } else {
        setAvailableCalls([...(CallsData || [])])
        setEventData([])
      }
    }, [filters.showAvailablity, CallsData, FormattedEventData])


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

    const handleZoomSettings = () => {
      setscheduleDialogOpen(false);
    }

    useImperativeHandle(ref, () => ({
      setCalendarDate(date: string) {
        if (!calendarRef.current) return;
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(date);
      },
      getCalendarDate() {
        if (!calendarRef.current) return;
        const calendarApi = calendarRef.current.getApi();
        return calendarApi.getDate();
      },
      changeView(view: string) {
        if (!calendarRef.current) return;
        const calendarApi = calendarRef.current?.getApi();
        return calendarApi.changeView(view);
      }
    }));

    const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
      if (clickInfo.event.extendedProps.type === "suggested_slot") {
        //handle suggested call slot. 
        let clientEvent = clickInfo.event.extendedProps.clientEvent;
        let expertEvent = clickInfo.event.extendedProps.expertEvent;
        const start = clientEvent.startTime > expertEvent.startTime ? clientEvent.startTime : expertEvent.startTime;
        const end = clientEvent.endTime > expertEvent.endTime ? expertEvent.endTime : clientEvent.endTime;
        let startDay = LocalDayjs(start);
        let endDay = LocalDayjs(end);
        let expert = experts?.find(val => val.label == expertEvent.title)
        console.log("handle it", clickInfo, expert, id, startDay, endDay, endDay.diff(startDay, 'm'));

        setExpert({ ...expert })
        setTime(startDay);
        setDuration(endDay.diff(startDay, 'm'));
        setscheduleDialogOpen(true);
        return;
      }
      if (clickInfo.event.extendedProps.type === "Call") {
        const clickedCall = getCallFromId(rawCallData, +clickInfo.event.id);
        if (clickedCall) {
          setCallinfo(clickedCall);
          handleOpenCallDetail();
        }
        return;
      }

      if (
        (isClient() && clickInfo.event.extendedProps.type === "Expert") ||
        (isExpert() && clickInfo.event.extendedProps.type === "Client")
      ) {
        setIsEditCard(false);
        setEventInfos(clickInfo.event);
        handleOpen();
        return;
      }
      setIsEditCard(true);
      setEventInfos(clickInfo);
      handleOpen();
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

    useEffect(() => {
      if (EventData && calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        let minDate: any = null;
        const nowDate = LocalDayjs();
        EventData.forEach((event) => {
          if (event.type === "Expert" && nowDate.isBefore(event.start)) {
            if (minDate && minDate.isBefore(event.start)) return;
            minDate = LocalDayjs(event.start);
          }
        });

        if (minDate) {
          calendarApi.gotoDate(minDate.toDate());
        }
      }
    }, [JSON.stringify(EventData)]);

    const suggestedSlots = useMemo(() => getOverlappingDurations(EventData), [EventData])

    function resizer(arg: { view: ViewApi }) {
      if (!calendarRef.current) return;
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(getFullCalendarView());
    }

    const checkDateSetContent = (val: any) => {
      if (val == 'timeGridDay') {
        setTodayText('Today')
      } else if (val == 'timeGridWeek') {
        setTodayText('This Week')
      } else if (val == 'dayGridMonth') {
        setTodayText('This Month')
      } else {
        setTodayText('Today')
      }
    }

    return (
      <Box sx={styles.WhiteBox}>
        <ModalInfosEventCalendar
          open={modalOpen}
          handleClose={handleClose}
          eventInfos={eventInfos}
          isEditCard={isEditCard}
          refetch={refetch}
          projectId={id}
          projectDetails={projectDetails}
        />

        <DialogModal
          title={
            "Schedule Call with " + expert?.label
          }
          isOpen={scheduleDialogOpen}
          handleClose={() =>
            handleZoomSettings()
          }
        >
          <ScheduleCall startTime={time} duration={duration}
            allowUseContext={false}
            handleClose={() =>
              handleZoomSettings()
            }
            handleSubmitClose={() => handleZoomSettings()}
            pe_id={expert?.value || 0}
            project_id={id}
          />
        </DialogModal>

        {callInfo && (
          <CallDetailModal
            callDetail={callInfo}
            open={callDetailModalOpen}
            closeDialog={handleCloseCallDetail}
            showReschduleNCancelBtn={callInfo.status === "Scheduled"}
            refetch={refetchCallDetails}
            showLogCallBtn={callInfo.status === "Scheduled" && LocalDayjs(callInfo.scheduled_start_time).isBefore(LocalDayjs())}
            openLogCall={(expert_id,call_id) => openLogCallDialog(expert_id,call_id)}
          />
        )}

        <CalendarContainer>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              timeGridPlugin,
              interactionPlugin,
              momentTimezonePlugin,
              dayGridMonthPlugin,
            ]}
            // initialView="timeGridWeek"
            slotEventOverlap={false}
            initialView={getFullCalendarView()}
            windowResize={resizer}
            select={handleAddEventSelectAndOpenModal}
            eventClick={handleEditEventSelectAndOpenModal}
            // eventChange={handleUpdateEventSelect}
            events={
              EventData && (!!not_show_calls || CallsData)
                ? [...EventData, ...(availableCalls || []), ...suggestedSlots]
                : undefined
            }
            longPressDelay={1000}
            eventLongPressDelay={1000}
            selectLongPressDelay={500}
            selectable={true}
            dayMaxEvents={true}
            allDaySlot={false}
            // editable={true}
            height="auto"
            headerToolbar={{
              left: `${(!showFilters) ? "custom1 " : ""
                }today prev,next myCustomButton`,
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            buttonText={{
              today: todayText
            }}

            customButtons={{
              custom1: {
                icon: "chevrons-right",
                click: openFilters,
              },
              myCustomButton: {
                text: `Total: ${totalCallInrange}`,
              },
            }}
            timeZone={timeZone ? timeZone : "local"}
            datesSet={(val) => {
              checkDateSetContent(val.view.type)
              setFiltersWithKey("date", LocalDayjs(val.start));
            }}
            showNonCurrentDates={false}
          />
        </CalendarContainer>
        <MobileInfo>
          <Typography>👉🏻 Long Press on any time-slot</Typography>
        </MobileInfo>
      </Box>
    );
  }
);

export default ProjectCalendar;
