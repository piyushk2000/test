import {
  calenderPropsTypes,
  calenderStyle,
  dateFieldStyle,
  dateTypes,
} from "./helper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Grid from "@mui/material/Grid";
import { DateField } from "@mui/x-date-pickers";
import { LocalDayjs } from "../../utils/timezoneService";
import dayjs from "dayjs";
export default function CalenderPicker(props: calenderPropsTypes) {
  const { selectDate, setSelectDate, getDate, dateLabel } = props;

  const dateOnChange = (date: any) => {
    if (dayjs(date).isValid()) {
      getDate && getDate(date)
      setSelectDate && setSelectDate((prev: any) => ({ ...prev, singleDate: date }));
    }
  };

  return (
    <Grid container columnSpacing={2} mt={"40px"}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            fullWidth
            value={selectDate}
            onChange={dateOnChange}
            label={dateLabel || "From"}
            format="DD/MM/YYYY"
            sx={dateFieldStyle}
            minDate={dayjs("01-01-1900")}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectDate}
            sx={calenderStyle}
            onChange={dateOnChange}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
