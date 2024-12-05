import {
  RefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridMonthPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  getFullCalendarView,
} from "../project-calendar/helper";
import { useBoolean } from "../../utils/hooks/useBoolean";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { useReadLocalStorage } from "usehooks-ts";
import CallDetailModal from "../../molecules/call-detail-modal";
import { ViewApi } from "fullcalendar";
import { LocalDayjs } from "../../utils/timezoneService";
import { Typography } from "@mui/material";
import { CalendarContainer, MobileInfo } from "../project-calendar/StylesComponents";
import { styles } from "../project-calendar/styles";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { MyCall } from "./types";
import { getCallFromId } from "./helper";


type Props = {
  openFilters: () => void;
  showFilters: boolean;
  ref: RefObject<{
    setCalendarDate: (date: Date) => void;
    getCalendarDate: () => Date;
  }>;
};

const ClientExpCalendar = forwardRef(
  (
    { showFilters, openFilters }: Props,
    ref
  ) => {
    const calendarRef = useRef<FullCalendar>(null);
    const { date, setDate, filters, setFilters, formattedCallDetails: CallsData, CallsDetails: rawCallData } = useMyCalenderContext();
    const timeZone = useReadLocalStorage<string | undefined>("timezone");
    const [todayText, setTodayText] = useState('Today');
    const [callInfo, setCallinfo] = useState<MyCall>();

    const {
      value: callDetailModalOpen,
      setTrue: handleOpenCallDetail,
      setFalse: handleCloseCallDetail,
    } = useBoolean(false);
    const [totalCallInrange, setTotalCallInrange] = useState(0);
    const [availableCalls, setAvailableCalls] = useState<any[]>([]);

    useEffect(() => {
      setAvailableCalls([...(CallsData || [])])

      if (!calendarRef.current) return;
      const calendarApi = calendarRef.current.getApi();
      const start = calendarApi.view.currentStart;
      const end = calendarApi.view.currentEnd;

      const callsInRange = (CallsData || []).filter((call) => {
        const callDate = new Date(call.start); // replace 'date' with the actual property name
        return callDate >= start && callDate < end;
      });

      setTotalCallInrange(callsInRange.length);
    }, [CallsData])


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
      if (clickInfo.event.extendedProps.type === "Call") {
        const clickedCall = getCallFromId(rawCallData, +clickInfo.event.id);
        if (clickedCall) {
          setCallinfo(clickedCall);
          handleOpenCallDetail();
        }
        return;
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


    const fetchDate = (arrange_tag: "Week" | "Month" | "Day") => {
      setFilters((prev) => ({
        ...prev,
        isFilterApplied: true,
        isFilterChange: true,
        arrange_tag
      }))
    }


    const checkDateSetContent = (val: any) => {
      if (val == 'timeGridDay') {
        fetchDate("Day")
        setTodayText('Today')
      } else if (val == 'timeGridWeek') {
        fetchDate("Week")
        setTodayText('This Week')
      } else if (val == 'dayGridMonth') {
        fetchDate("Month");
        setTodayText('This Month')
      } else {
        setTodayText('Today')
      }
    }

    return (
      <Box sx={styles.WhiteBox}>
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
            plugins={[
              timeGridPlugin,
              interactionPlugin,
              momentTimezonePlugin,
              dayGridMonthPlugin,
            ]}
            slotEventOverlap={false}
            initialView={getFullCalendarView()}
            windowResize={resizer}
            eventClick={handleEditEventSelectAndOpenModal}
            events={
              CallsData
                ? [...(availableCalls || [])]
                : undefined
            }
            longPressDelay={1000}
            eventLongPressDelay={1000}
            selectLongPressDelay={500}
            selectable={true}
            dayMaxEvents={true}
            allDaySlot={false}
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
              setDate(LocalDayjs(val.start));
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

export default ClientExpCalendar;