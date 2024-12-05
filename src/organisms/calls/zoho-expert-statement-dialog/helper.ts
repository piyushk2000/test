import { EnqueueSnackbar } from "notistack";
import { LocalDayjs } from "../../../utils/timezoneService"


export function changeFilterUrl(date: Date | null,
    tDate: Date | null,
    select: string | null, enqueueSnackbar: EnqueueSnackbar) {
    const smallestDate = LocalDayjs("2024-04-01");
    const largestDate = LocalDayjs(new Date());

    const currentDate = date && LocalDayjs(date) || "";

    if (!smallestDate.isSameOrBefore(currentDate)) {
        enqueueSnackbar(("Please select a" + (select === "between" ? " 'From' " : "") + "date after 1st April 2024"), { variant: "warning" });
        return null;
    }

    if (largestDate.isBefore(currentDate)) {
        enqueueSnackbar("Select past date", { variant: "warning" });
        return null;
    }

    if (select === "between" || select === "on") {
        if ( select === "between" && largestDate.isBefore(LocalDayjs(tDate || new Date()))) {
            enqueueSnackbar("Please select a 'To' date from the past", { variant: "warning" });
            return null;
        }

        return {
            from_date: date,
            to_date: tDate
        }
    }

    if (select === "before") {
        return {
            from_date: smallestDate.format("YYYY-MM-DD"),
            to_date: date
        }
    }

    if (select === "after") {

        return {
            to_date: largestDate.format("YYYY-MM-DD"),
            from_date: date
        }
    }
}