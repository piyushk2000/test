export interface ScheduledCalls {
  [key: string]: ScheduledCall[];
}

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

export interface CalendarEvent  {
    title: string;
    start: string;
    end: string;
    type: string;
    id: string;
    backgroundColor: string;
}