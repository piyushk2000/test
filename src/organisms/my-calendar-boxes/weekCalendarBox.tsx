import Grid from "@mui/material/Grid";
import { useState } from "react";
import { MyCall, MyCalls } from "../my-calendar/types";
import { Groups } from "../admin/types";
import MappingContainer from "../../atoms/mapping-container";
import MappingItems from "./mappingItem";
import { getBoxColor, getCallColor, getDay } from "./helper";
import CallDetailModal from "../../molecules/call-detail-modal";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { LocalDayjs } from "../../utils/timezoneService";

type Props = {
  CallsDetails: MyCalls;
  groupData: Groups | null;
  isGroupedByAm: boolean;
};

export default function WeekCalendarBoxes({ CallsDetails, groupData, isGroupedByAm }: Props) {
  const [callInfo, setCallinfo] = useState<MyCall>();
  const { status: callStatus } = getCallColor(callInfo || null);
  const { refetchCallsDetails } = useMyCalenderContext();

  return (
    <Grid container sx={{
      flexWrap: "nowrap",
      overflow: "auto",
      paddingBottom: "1rem",
      borderLeft: "1px solid #EC9324",
      borderRight: "1px solid #EC9324",
    }}>
      {Object.entries(CallsDetails).map((item, index) => {
        let groupName = item[0] !== "Other" ? LocalDayjs(item[0]).format("DD MMM YY") : "";
        const colorScheme = getBoxColor(index);
        const day = getDay[index];

        return (
          <MappingContainer
            maxItem={8}
            sx={{
              margin: "0.5rem",
              minWidth: "280px"
            }}
            key={groupName + index + Math.random()}
            titleColor={colorScheme.titleColor}
            componentColor={colorScheme.componentColor}
            title={`${groupName} ${day} (${item[1].length})`}
            items={item[1]}
            renderItem={(call, index) => (
              <MappingItems
                key={index + call.id + Math.random()}
                textColor={colorScheme.componentColor}
                noBorder={index === 5}
                callData={call}
                onClick={() => setCallinfo(call)}
              />
            )}
          />
        );
      })}

      {callInfo && (
        <CallDetailModal
          callDetail={callInfo}
          open={!!callInfo}
          closeDialog={() => setCallinfo(undefined)}
          showReschduleNCancelBtn={(callStatus === "Scheduled" || callStatus === "Pending")}
          refetch={refetchCallsDetails}
        />
      )}
    </Grid>
  );
}
