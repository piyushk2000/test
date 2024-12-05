import getDurationOptions from "../../../../../../utils/getDurationOptions";
import { getISTDateTime } from "../../../../../../utils/timezoneService";
import { ScheduleCallFormTypes, ZoomSetttingsFormDefault, ZoomSetttingsFormTypes } from "../helper";

const returnAlternativeObject = (array: any[]) => {
    let str = `${array[0]}`;
    array.forEach((val, i) => {
      if (i > 0) {
        str += ';' + val;
      }
    })
    return str
  }
  
  const returnComplianceObject = (array: any[]) => {
    let arr: any[] = []
    array.forEach((val, i) => {
      arr.push(
        {
          "email": val,
          "name": val
        })
    })
    return arr;
  }
  
  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  }
  
  export const functionReturnZoomObject = (formData: ScheduleCallFormTypes, zoomSettings: ZoomSetttingsFormTypes) => {
    let obj = {
      "agenda": `${formData.title}`,
      "default_password": true,
      "duration": formData.duration ? parseInt(formData.duration?.value) + 30 : 30,
      "password": randomNumber(100000, 999999),
      "settings": {
        "allow_multiple_devices": true,
        "alternative_hosts": zoomSettings.alternate_hosts.length > 0 ? returnAlternativeObject(zoomSettings.alternate_hosts) : "",
        "alternative_hosts_email_notification": false,
        "approval_type": 2,
        "audio": zoomSettings.audio,
        "authentication_exception": zoomSettings.compliance_officer ? returnComplianceObject(zoomSettings.compliance_officer) : [],
        "auto_recording": zoomSettings.record_meeting ? "cloud" : 'none',
        "calendar_type": 2,
        "close_registration": true,
        "email_notification": false,
        "encryption_type": "enhanced_encryption",
        "focus_mode": true,
        "host_video": zoomSettings.video_host,
        "jbh_time": 0,
        "join_before_host": zoomSettings.joinAnytime,
        "meeting_authentication": false,
        "mute_upon_entry": zoomSettings.mute_entry,
        "participant_video": zoomSettings.video_participant,
        "private_meeting": false,
        "show_share_button": true,
        "use_pmi": false,
        "waiting_room": zoomSettings.waiting_room,
        "watermark": false,
        "host_save_video_order": true,
        "alternative_host_update_polls": true,
        "internal_meeting": false,
        "continuous_meeting_chat": {
          "enable": zoomSettings.meeting_chat,
          "auto_add_invited_external_users": true
        },
        "participant_focused_meeting": false,
        "push_change_to_calendar": false,
        "auto_start_meeting_summary": false,
        "auto_start_ai_companion_questions": false
      },
      "start_time": getISTDateTime(formData.scheduled_start_time).slice(0, 19),
      "timezone": "Asia/Kolkata",
      "topic": `${formData.title}`,
      "type": 2
    }
    return obj;
  }

  export const functionReturnZoomSettings = (zoomObject: any) => {

    if(!zoomObject) {
        return ZoomSetttingsFormDefault;
    }

    const zoomSettings: ZoomSetttingsFormTypes = {
        alternate_hosts: zoomObject.settings.alternative_hosts ? zoomObject.settings.alternative_hosts.split(',') : [],
        audio: zoomObject.settings.audio,
        compliance_officer: zoomObject.settings.authentication_exception || [],
        record_meeting: zoomObject.settings.auto_recording === 'cloud',
        video_host: zoomObject.settings.host_video,
        joinAnytime: zoomObject.settings.join_before_host,
        mute_entry: zoomObject.settings.mute_upon_entry,
        video_participant: zoomObject.settings.participant_video,
        waiting_room: zoomObject.settings.waiting_room,
        meeting_chat: zoomObject.settings.continuous_meeting_chat.enable,
        masking_host: false,
        masking_participant: false,
      };

      return zoomSettings;
  }

  export function formatCallDuration(duration: number) {
    let options = getDurationOptions(15, 240);
    let dur = options.find(val => val.value == duration.toString())

    let final_dur =  { label: dur?.label || '', value: dur?.value || '' };
    return final_dur;
  }