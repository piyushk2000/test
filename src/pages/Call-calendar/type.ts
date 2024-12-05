export interface Calls {
  [id: string]: Call[];
}

export interface Call {
  id: number;
  title: string;
  status: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  chargeable_mins?: number;
  call_start_time?: string;
  client_participants: string;
  fk_expert: number;
  call_status?: string;
  fk_project: number;
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

