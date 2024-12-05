export type ZoomSetttingsFormTypes = {
  video_host: boolean;
  video_participant: boolean;
  masking_host: boolean;
  masking_participant: boolean;
  audio: string | null;
  alternate_hosts: any[];
  compliance_officer: any[];
  meeting_chat: boolean;
  record_meeting: boolean;
  waiting_room: boolean;
  joinAnytime: boolean;
  mute_entry: boolean;
};

export type ScheduleCallFormTypes = {
  title: string;
  call_title_for_expert: string;
  scheduled_start_time: any | null;
  duration: { label: string, value: string } | null;
  client_participants: any[];
  invitation_text: string;
  invitation_text_for_expert: string;
  videoLinkOption: string | null;
  meetingLink: string | null;
  doNotSendEmail:boolean;
  zoomSettings: ZoomSetttingsFormTypes | null;
  research_analyst:{ label: string, value: number }|null
};

export const ScheduleCallFormDefault: ScheduleCallFormTypes = {
  title: "",
  call_title_for_expert: "",
  scheduled_start_time: null,
  duration: null,
  client_participants: [],
  invitation_text: "",
  invitation_text_for_expert: "",
  videoLinkOption: '',
  meetingLink: null,
  doNotSendEmail:true,
  zoomSettings: null,
  research_analyst:null
};

export const ZoomSetttingsFormDefault: ZoomSetttingsFormTypes = {
  video_host: false,
  video_participant: false,
  masking_host: false,
  masking_participant: false,
  audio: "both",
  alternate_hosts: [],
  compliance_officer: [],
  meeting_chat: true,
  record_meeting: true,
  waiting_room: false,
  joinAnytime: true,
  mute_entry: true
};

export const commonInputStyles: any = {
  className: "backgroundWhite-description",
  size: "small",
  variant: "outlined",
  fullWidth: true,
};

export const scheduleTypeStyle = {
  color: "#EC9324",
  fontWeight: "500",
  borderBottom: "2px solid #EC9324",
  width: "fit-content",
  padding: "0 10px",
  fontSize: "14px",
  marginLeft: "1rem",
  marginTop: "0.5rem",
  marginBottom: "-0rem"
}

export const zoomBoxStyles = {
  border: '1px solid #c4c4c4', margin: '5px', borderRadius: '3px', padding: '3px', display: 'flex'
  , justifyContent: 'space-around', alignItems: 'center', cursor: 'pointer'
}


export function formatClientContact(data: any) {
  if (data && data[0] && data[0].client_contacts_value) {
    return data[0].client_contacts_value.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  } else {
    return [];
  }
}

export function formatResearchAnalyst(data: any) {
  if (data && data[0] && data[0].research_analysts_value) {
    return data[0].research_analysts_value.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  } else {
    return [];
  }
}
