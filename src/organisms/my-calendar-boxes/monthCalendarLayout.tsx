import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BoxFlex } from '../../atoms/boxSpaceBtw';
import { Link } from 'react-router-dom';
import { AppRoutes } from "../../constants";
import { LocalDayjs } from "../../utils/timezoneService";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { getCalenderLink } from "./helper";
import useMediaQuery from "@mui/material/useMediaQuery";
import {getInitial} from "../../organisms/my-calendar-boxes/helper";

type Props = {
  callDetail: { color: string, status: string, calls: number }[];
  current_date: string | null;
}

const MonthCalendarLayout = (props: Props) => {
  const current_date = props.current_date;
  const { filters } = useMyCalenderContext();
  const calendar_link = getCalenderLink(filters, current_date);
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Grid
      item
      xs={1.6}
    >
      {current_date ?
        <Link
          to={calendar_link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <CallButton {...props} isMobile={isMobile} />
        </Link>
        : <CallButton {...props} isMobile={isMobile} />
      }
    </Grid>
  )
}

function CallButton({ current_date, callDetail, isMobile }: Props & { isMobile: boolean }) {
  return (
    <Button
      sx={{ width: "100%", height: "100%", minHeight: isMobile ? "80px" : "150px",display: "flex",flexDirection: "column",justifyContent: "flex-start", color: "rgba(0, 0, 0, 0.56)", borderColor: "#ec932470", textTransform: "capitalize",minWidth:'0px !important',  padding: isMobile ?'0px !important':'' }}
      variant="outlined"
      disabled={!current_date}
    >
      {current_date &&
        <>
          <p style={{ marginBottom: isMobile ? "10px" : "30px", fontSize: isMobile ? "0.8rem" : "1rem" }}>
            {LocalDayjs(current_date).format(isMobile ? "DD" : "DD MMM")}
            {isMobile ? <></> : LocalDayjs(current_date).format(", ddd")}
          </p>
          <Box>
            {callDetail.map((c) => (
              <>
                {!!c.calls &&
                  <BoxFlex key={c.calls + Math.random()} sx={{ gap: '0.5rem', margin: "0.25rem 0" }}>
                    <p style={{ textTransform: "capitalize", fontWeight: "bold", fontSize: isMobile ? "0.75rem" : "1rem" }}>
                      <span>{isMobile ? getInitial(c.status) : c.status}</span>: <span>{c.calls}</span>
                    </p>
                  </BoxFlex>
                }
              </>
            ))}
          </Box>
        </>}
    </Button>
  )
}

export default MonthCalendarLayout