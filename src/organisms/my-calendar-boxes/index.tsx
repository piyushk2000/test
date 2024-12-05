import { MyCalls } from "../my-calendar/types";
import { Groups } from "../admin/types";
import DayCalendarBoxes from "./dayCalendarBox";
import WeekCalendarBoxes from "./weekCalendarBox";
import MonthCalendarBox from "./monthCalendarBox";

type Props = {
  CallsDetails: MyCalls;
  groupData: Groups | null;
  isGroupedByAm: boolean;
  arrangeBy: "Day" | "Week" | "Month"
};

export default function MyCalendarBoxes(props: Props) {

  return (
    <>
      {
        props.arrangeBy === "Day" &&
        <DayCalendarBoxes {...props} />
      }
      {
        props.arrangeBy === "Week" &&
        <WeekCalendarBoxes {...props} />
      }
      {props.arrangeBy === "Month" &&
        <MonthCalendarBox {...props} />
      }
    </>
  );
}
