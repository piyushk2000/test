import { createTheme } from "@mui/material/styles";
import { ScheduledCall } from "../../organisms/project-calendar/types";
import { LocalDayjs } from "../../utils/timezoneService";
import { isClient, isExpert } from "../../utils/role";
import { RequestServer } from "../../utils/services";
import { APIRoutes } from "../../constants";
import { ComplianceEndBeforeType, ComplianceStartAfterType } from "../../organisms/project/project-pe-mapping/type";

export const CustomFontTheme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#EC9324",
    },
  },
});

export function getFormattedDetails(callDetail: Partial<ScheduledCall>) {
  let formattedDetails = [
    {
      label: "Scheduled Start Time",
      value: formatDateTime(callDetail.scheduled_start_time),
    },
    {
      label: "Scheduled End Time",
      value: formatDateTime(callDetail?.scheduled_end_time),
    },
    {
      label: "Client Participants",
      value: callDetail.client_participants_value
        ? callDetail.client_participants_value
            .map((item) => item.name)
            .join(", ")
        : undefined,
    },
    {
      label: "Call Type",
      value: callDetail.call_type,
    },
  ];

  if (!isClient() && !isExpert()) {
    formattedDetails.push({
      label: "Status",
      value: callDetail.status,
    });
    formattedDetails.push({
      label: "Account Manager",
      value: callDetail.fk_project_value?.account_manager_value?.name,
    });
  }else{
    let findIndex=formattedDetails.findIndex(val=>val.label=='Client Participants');
    formattedDetails.splice(findIndex,1);
  }

  return formattedDetails;
}

function formatDateTime(date: string | undefined) {
  if (!date) return "N/A";
  const formattedDate = LocalDayjs(date).format("hh:mma DD/MM/YYYY");
  return formattedDate;
}

export async function isLogCallAllowed(callDetail: any, peData: any, setShowLogCallTrue: () => void) {
  if(!peData) {
    return;
  }

  const data = peData[0];
  const {expert_invitation, agenda_shared_on, agenda_responses, csc_marked_completed_by, client_compliance_requirement,state} = data;

  const complianceResponse = await RequestServer(APIRoutes.EXPERT_COMPLIANCE + "?fk_client=" + callDetail.fk_client + "&notin___state=InActive", "GET");

  const is_agenda_shared = !!agenda_shared_on;
  const is_agenda_completed = !!agenda_responses;
  const compliances_count: number = complianceResponse?.data?.length || 0;
  const is_compliance_done = !!csc_marked_completed_by;
  const [compliance_start_after, compliance_end_before]: [ComplianceStartAfterType, ComplianceEndBeforeType] = client_compliance_requirement.split(" | ") as [ComplianceStartAfterType, ComplianceEndBeforeType];

  const show_compliance_conditions = compliances_count !== 0 && !is_compliance_done && compliance_start_after !== "Not Required"; 

  if (!show_compliance_conditions && state !== "Rejected") {
    // If the Expert Invitatation is accepted + if agenda is shared , agenda must be completed
    if (expert_invitation === "Accepted") {
      if ((is_agenda_shared && is_agenda_completed) || !is_agenda_shared) {
        setShowLogCallTrue();
      }
    }
  }
}