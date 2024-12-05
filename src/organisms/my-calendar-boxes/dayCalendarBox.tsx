import Grid from "@mui/material/Grid";
import { useState } from "react";
import { MyCall, MyCalls } from "../my-calendar/types";
import { Groups } from "../admin/types";
import MappingContainer from "../../atoms/mapping-container";
import MappingItems from "./mappingItem";
import { getBoxColor, getCallColor } from "./helper";
import CallDetailModal from "../../molecules/call-detail-modal";
import { useMyCalenderContext } from "../../pages/my-calendar/context";
import { openLogCallDialog } from "../my-calendar/helper";
import { LocalDayjs } from "../../utils/timezoneService";

type Props = {
  CallsDetails: MyCalls;
  groupData: Groups | null;
  isGroupedByAm: boolean;
};

export default function DayCalendarBoxes({ CallsDetails, groupData, isGroupedByAm }: Props) {
  const [callInfo, setCallinfo] = useState<MyCall>();
  const { status: callStatus } = getCallColor(callInfo || null);
  const { refetchCallsDetails , setLogCall } = useMyCalenderContext();

  return (
    <Grid container sx={{
      maxHeight: "80vh",
      alignItems: "stretch",
      justifyContent: "center",
      overflowY: "auto",
      padding: "1rem",
      borderTop: "1px solid #EC9324",
      borderBottom: "1px solid #EC9324",
      marginTop: "1rem"
    }}>
      {Object.entries(CallsDetails).map((item, index) => {
        let groupName;
        if (!isGroupedByAm) {
          const callGroup = groupData?.find((i) => String(i.id) === item[0]);
          groupName = callGroup ? callGroup.label : "Other";
        } else {
          const [AM_ID, values] = item;
          groupName = values[0]?.fk_project_value?.account_manager_value?.name || "";
        }

        const colorScheme = getBoxColor(index);

        return (
          <MappingContainer
            sx={{
              margin: "0.5rem",
              minWidth: "280px"
            }}
            key={groupName + index + Math.random()}
            titleColor={colorScheme.titleColor}
            componentColor={colorScheme.componentColor}
            title={`${groupName} (${item[1].length})`}
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
          openLogCall={(expert_id,call_id) => {
            openLogCallDialog(setLogCall,expert_id.toString(),call_id,callInfo.fk_pe,callInfo.fk_project_value,groupData,refetchCallsDetails)
          }}
          showLogCallBtn={callInfo.status === "Scheduled" && LocalDayjs(callInfo.scheduled_start_time).isBefore(LocalDayjs())}
        />
      )}
    </Grid>
  );
}
