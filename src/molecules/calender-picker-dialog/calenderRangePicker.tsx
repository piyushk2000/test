import {
  calenderRangePropsTypes,
  calenderStyle,
  dateFieldStyle,
} from "./helper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Grid, useMediaQuery } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { LocalDayjs } from "../../utils/timezoneService";
import { useReadLocalStorage } from "usehooks-ts";
import dayjs from "dayjs";
export default function CalenderRangePicker(props: calenderRangePropsTypes) {
  const { selectDate, setSelectDate } = props;
  const isMobile = useMediaQuery("(max-width: 900px)");

  const fromDateOnChange = (e: any) => {
    setSelectDate((prev: any) => ({ ...prev, date: [e, prev.date[1]] }));
  };

  const toDateOnChange = (e: any) => {
    setSelectDate((prev: any) => ({ ...prev, date: [prev.date[0], e] }));
  };

  return (
    <Grid container columnSpacing={2} mt={"40px"}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            fullWidth
            value={selectDate ? selectDate[0] : dayjs()}
            onChange={fromDateOnChange}
            label="From"
            format="DD/MM/YYYY"
            sx={dateFieldStyle}
          />
        </LocalizationProvider>
      </Grid>

      {isMobile ? (
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectDate ? selectDate[0] : dayjs()}
              sx={calenderStyle}
              onChange={fromDateOnChange}
            />
          </LocalizationProvider>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              value={selectDate ? selectDate[1] : dayjs()}
              onChange={toDateOnChange}
              label="To"
              format="DD/MM/YYYY"
              sx={dateFieldStyle}
            />
          </LocalizationProvider>
        </Grid>
      )}

      {isMobile ? (
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              value={selectDate ? selectDate[1] : dayjs()}
              onChange={toDateOnChange}
              label="To"
              format="DD/MM/YYYY"
              sx={dateFieldStyle}
            />
          </LocalizationProvider>
        </Grid>
      ) : (
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectDate ? selectDate[0] : dayjs()}
              sx={calenderStyle}
              onChange={fromDateOnChange}
            />
          </LocalizationProvider>
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectDate ? selectDate[1] : dayjs()}
            sx={calenderStyle}
            onChange={toDateOnChange}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}
