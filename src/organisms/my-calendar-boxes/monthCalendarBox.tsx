import Grid from "@mui/material/Grid";
import { MyCalls } from "../my-calendar/types";
import { Groups } from "../admin/types";
import { formatMonthDayCall, getCallDetailsArr } from "./helper";
import { LocalDayjs } from "../../utils/timezoneService";
import MonthCalendarLayout from "./monthCalendarLayout";
import { BoxFlex } from "../../atoms/boxSpaceBtw";
import { useIsMobile } from "../../utils/hooks/useIsMobile";

type Props = {
  CallsDetails: MyCalls;
  groupData: Groups | null;
  isGroupedByAm: boolean;
};

export default function MonthCalendarBox({ CallsDetails }: Props) {
  const callDetailsArr = getCallDetailsArr(CallsDetails);
  const isMobile = useIsMobile()

  return (
    <>  
    {isMobile && <Grid container sx={{display:'flex', justifyContent:'center'}}>
        {['M','T', 'W', 'T', 'F', 'S', 'S'].map(d => (
          <Grid item xs={1.6}>{d}</Grid>
        ))}
        </Grid>}
    <Grid container item sx={{
      overflow: "auto",
      paddingBottom: "1rem",
      gap: "1px",
    }}>
      {callDetailsArr.map((item, index) => {
        let current_date = item[0] !== "Other" ? (item[0] || null) : "";
        const calls = formatMonthDayCall(item[1]);

        return (
          <MonthCalendarLayout
            key={current_date || "" + index + Math.random()}
            callDetail={calls}
            current_date={current_date}
          />
        );
      })}
    </Grid>
    </>
  );
}
