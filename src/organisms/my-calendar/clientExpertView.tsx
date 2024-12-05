import { BoxFlex } from "../../atoms/boxSpaceBtw";
import FilterSidebar from "./filters";
import { useMyCalenderContext } from "../../pages/my-calendar/context";

import { useRef } from "react";
import ClientExpCalendar from "./clientExpCalendar";
import { Dayjs } from "dayjs";


export default function MyExpertClientWithFilters() {
    const {
        showFilters,
        openFilters,
        closeFilters,
        date,
        setDate,
        filters,
        setFilters,
    } = useMyCalenderContext();


    const projectCalendarRef = useRef<{
        setCalendarDate: (date: Date) => void;
        getCalendarDate: () => Date;
        changeView: (viewName: string) => void;
    }>(null);

    const setDateForCalendar = (date: Dayjs | null) => {
        if (projectCalendarRef?.current?.setCalendarDate && date) {
            projectCalendarRef.current.setCalendarDate(date.toDate());
        }
    };

    return (
        <BoxFlex sx={{ alignItems: "stretch", gap: "1rem" }}>
            {showFilters &&
                <FilterSidebar
                    closeFilters={closeFilters}
                    filters={filters}
                    setFilters={setFilters}
                    date={date}
                    setDate={setDate}
                    setDateForCalendar={setDateForCalendar}
                />
            }
            <ClientExpCalendar
                openFilters={openFilters}
                showFilters={showFilters}
                ref={projectCalendarRef}
            />
        </BoxFlex >
    );
}
