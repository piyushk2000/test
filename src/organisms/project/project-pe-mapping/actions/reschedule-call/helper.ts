import { Dispatch, SetStateAction } from "react";
import { ScheduleCallFormTypes } from "../schedule-call/helper";
import { LocalDayjs } from "../../../../../utils/timezoneService";
import { formatCallDuration, functionReturnZoomSettings } from "../schedule-call/form/helper";
import { RequestServer } from "../../../../../utils/services";
import { APIRoutes } from "../../../../../constants";
import { FormatToLVCommon } from "../../../../../common/formatData";

export async function getDefaultValues(data: any,setDefaultValues: Dispatch<SetStateAction<ScheduleCallFormTypes | null>>) {
    const { scheduled_start_time, scheduled_end_time, zoom_meeting_id, call_link, zoom_api_request, title, call_title_for_expert, invitation_text_for_expert, invitation_text, client_participants: client_participants_ids, research_analyst: research_analyst_id } = data;

    const videoLinkOption = zoom_meeting_id ? "zoom" : call_link ? "manual" : "none";

    // Client Participants
    const get_client_contact_response = await RequestServer(APIRoutes.clientContactUrl + "?in___id=" + client_participants_ids + "&show_columns=id,name", "GET"); 
    
    let client_participants: {label: string, value: number}[] = [];

    if(get_client_contact_response.success) {
        client_participants = FormatToLVCommon<{id: number , name: string},"name","id">(get_client_contact_response.data,"name","id");
    }

    // Research Analyst
    const research_analyst_response = await RequestServer(APIRoutes.users + "?id=" + research_analyst_id + "&show_columns=id,name", "GET");

    let research_analyst: any = null;

    if(research_analyst_response.success) {
        research_analyst = FormatToLVCommon<{id: number , name: string},"name","id">(research_analyst_response.data,"name","id")[0];
    }
    

    setDefaultValues((prev) => ({
        scheduled_start_time: LocalDayjs(scheduled_start_time),
        duration: formatCallDuration(Math.abs(LocalDayjs(scheduled_start_time).diff(LocalDayjs(scheduled_end_time), "minute"))),
        title,
        call_title_for_expert,
        client_participants,
        invitation_text,
        invitation_text_for_expert,
        videoLinkOption,
        meetingLink: call_link,
        doNotSendEmail: true,
        zoomSettings: functionReturnZoomSettings(zoom_api_request),
        research_analyst
    }))
}