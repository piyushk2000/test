import { AccountManagerValue } from "../../pages/Projects/types";

export interface ScheduledCalls {
  [key: string]: ScheduledCall[];
}

type Project = {
  id: number;
  external_topic: string;
  status: string;
  topic?: string;
  account_manager_value?: AccountManagerValue;
};

export interface ScheduledCall {
  id: number;
  title: string;
  client_participants: string;
  invitation_text: any;
  fk_expert: number;
  fk_client: number;
  fk_project: number;
  fk_pe: number;
  status: string;
  call_medium: any;
  scheduled_start_time: string;
  scheduled_end_time: string;
  billing_office_id: any;
  casecode: any;
  call_start_time: any;
  selling_price: any;
  selling_price_currency: any;
  chargeable_mins: any;
  cost_price: any;
  cost_price_currency: any;
  payable_mins: any;
  client_contact: any;
  account_manager: any;
  account_manager_value?: { name: string, id: number } | null;
  research_analyst: any;
  expert_rating: any;
  expert_type: string;
  call_type: any;
  geographies: any;
  revenue_in_inr: any;
  revenue_in_usd: any;
  exchange_rate_chargeable: any;
  exchange_rate_payable: any;
  call_link: any;
  remark: any;
  fk_expert_value: FkExpertValue;
  client_participants_value: ClientParticipantsValue[];
  zoom_meeting_id: string | null;
  fk_project_value: Project;
  zoom_account_used:string;
  zoom_host_key?: number | null | undefined; 
}

export interface FkExpertValue {
  name: string;
  id: number;
}

export interface ClientParticipantsValue {
  name: string;
  id: number;
}

export interface RawEvent {
  id: number;
  fk_project: number;
  start_time: string;
  end_time: string;
  type: string;
  participant_id: number;
  participant_name: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export type CalendarEvent =
  | {
      title: string;
      start: string;
      end: string;
      type: string;
      id: string;
      backgroundColor: string;
      zoom_meeting_id?: string | null;
    }
  | {
      type: "suggested_slot";
      title: string;
      start: string;
      end: string;
      id: string;
      backgroundColor: string;
      clientEvent: CalendarEvent;
      expertEvent: CalendarEvent;
    };
