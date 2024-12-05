import { Dispatch, SetStateAction } from "react";
import { Meta } from "../../organisms/expert-cards/types";

export type labelValue = {
  label: string;
  value: number;
};

export type ClientValue = {
  id: number;
  fk_cem: number | null;
  name: string;
  type: string;
  client_specific_compliance_requirement: string;
  contract_valid_till: string | null;
  created_at: string;
  updated_at: string;
};

export interface GeographyValue {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AccountManagerValue {
  id: number;
  role: string;
  name: string | undefined;
  email: string;
  username: string;
  mobile: string;
  password: string;
  picture: string | null;
  added_by: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  otp: string | null;
  last_otp_generated_at: string | null;
  otp_attempts: number | null;
  otp_expiry: string | null;
  block_expiry: string | null;
  meta: Record<string, unknown>;
}

export interface DomainValue {
  id: number;
  name: string;
  parent_id: number | null;
  level: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ExpertGeographyValue {
  id: number;
  name: string;
  parent_id: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ResearchAnalystValue {
  id: number;
  name: string;
}

export interface ClientContactValue {
  id: number;
  name: string;
}

export interface billingOfficeValue {
  id: number;
  name: string;
  entityName: string;
  address: string;
  city: string;
  country: string;
  GSTIN: string;
  client_id: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface projectApiDataItem {
  expert_geographies: string[];
  research_analysts: string[];
  client_contacts: string[];
  case_code: string[] | null | undefined;
  id: number;
  topic: string;
  external_topic: string;
  applicable_agenda_id: number;
  client_id: number;
  client_name: string;
  client_geography: number;
  account_manager: number;
  sibling_projects: string[];
  l0_domain: number;
  l1_domain: number;
  l2_domain: number;
  l3_domain: number | null;
  functions: string;
  receiving_date: string;
  created_at: string;
  closed_on?: string;
  updated_at: string;
  billing_office: number | null;
  domain_others: string;
  target_date: string | null;
  priority: "High" | "Medium" | "Low" | null;
  status: string;
  no_of_calls: number;
  target_companies: string;
  description: string;
  client_value: ClientValue;
  geography_value: GeographyValue;
  account_manager_value: AccountManagerValue;
  l0_domain_value: DomainValue;
  l1_domain_value: DomainValue;
  l2_domain_value: DomainValue;
  l3_domain_value: DomainValue | null;
  billing_office_value: billingOfficeValue | null;
  expert_geographies_value: ExpertGeographyValue[];
  research_analysts_value: ResearchAnalystValue[];
  client_contacts_value: ClientContactValue[];
  fk_group: string;
  total_revenue: number;
  call_count: number;
  profile_shared: number;
  ce_done: number;
  type:string;
  name_masking: boolean | null;
  offlimit_topics: string | null;
  offlimit_companies: string | null;
  meta:any;
}

export interface ProjectApiDataResponse {
  data: projectApiDataItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ceMappingData {
  status: string;
  meta: Meta;
  name: string;
  id: number;
}

export interface ceMappingItems {
  success: boolean;
  message: string;
  data: ceMappingData[];
}

export interface projectDetailsDefaultValues {
  projectDetails: projectApiDataItem | null;
  ce_mapping: ceMappingItems | null | undefined;
  pe_mapping: peMappingItems[] | null | undefined;
}

export type setProjectDetailsDefaultValues = Dispatch<
  SetStateAction<projectDetailsDefaultValues>
>;

export type FormattedData = {
  label: string;
  value: string;
}[];

export type AgendaDataState = {
  agenda: null | AgendaItem[];
  applicable_agenda_id: number | null;
};

export type SetAgendaDataState = Dispatch<SetStateAction<AgendaDataState>>;

export type AgendaResponse = {
  answer: string;
  question: string;
  expert_note: string;
};

type AgendaItem = {
  agenda_responses: AgendaResponse[] | null;
  fk_agenda: number | null;
  agenda_shared_on: string;
  id: number;
  expert_name: string;
};

export type AgendaGetApiResponse = {
  success: boolean;
  message: string;
  data: AgendaItem[];
};

export type dialogTypes = {
  addProject: { state: boolean; isChange: boolean };
  filter: { state: boolean; isChange: boolean };
  addPE: {
    state: boolean;
    id: string | null;
    isChange: boolean;
    isProjectDetails: boolean;
    selectedExpert?: { label: string; value: number } | null | undefined;
    refetch: null | (() => Promise<void>);
  };
  addSPE: {
    state: boolean;
    id: string | null;
    isChange: boolean;
    isProjectDetails: boolean;
    refetch: null | (() => Promise<void>);
  };
  addCE: {
    state: boolean;
    id: string | null;
    isChange: boolean;
    mapped_project: { label: string; value: number } | null;
    refetch: (() => Promise<void>) | null;
  };
  editProject: {
    state: boolean;
    id: string | null;
    isChange: boolean;
    apiData: projectApiDataItem | null;
  };
  TAT: {
    state: boolean;
    apiData: projectApiDataItem | null;
    expert_invitation_counts?: Record<string,number> ;
  };
  agenda: {
    state: boolean;
    openAddAgenda: () => void;
    project_id: number | null;
    isAgendaIdChanged: boolean;
    isAdminAllowed: boolean;
    isProjectOpen: boolean;
  };
  isAgendaDescription: {
    state: boolean;
    isChange: boolean;
    fk_agenda: AgendaItem["fk_agenda"];
    agenda_responses: AgendaResponse[] | null;
    pe_id: number | null;
    isAdminAllowed: boolean;
    isProjectOpen: boolean;
  };
  logCall: {
    state: boolean;
    isChange: boolean;
    project_id: number | null;
    refetch: (() => Promise<void>) | null;
    pe_id: string | null;
    expert_id: string | null;
    is_account_manager: boolean;
    is_group_admin: boolean;
  };
  logExtension: {
    state: boolean;
    isChange: boolean;
    project_id: number | null;
    apiData: projectApiDataItem | null;
  };
  logWorkStream: {
    state: boolean;
    isChange: boolean;
    project_id: number | null;
    apiData: projectApiDataItem | null;
  };
  linkProject: {
    state: boolean;
    isChange: boolean;
    project_id: number | null;
    apiData: projectApiDataItem | null;
  };
  delinkProject: {
    state: boolean;
    project_id: number | null;
    siblingProjects: string[] | null | undefined;
  };
  accManager: {
    state: boolean;
    acc_id: number | null;
  };
};

export type setDialogTypes = Dispatch<SetStateAction<dialogTypes>>;
export type filterPayload = {
  dateFilter: any;
  sortFilter: string | null;
  advanceFilter: any;
  search: string | null;
  search_by_id: string | null;
  client_topic_search: string | null; // Only for Client Login
  client_case_code_search: string | null; // Only for Client Login
  isFilterChange: boolean;
  quickFilter: any;
  projectLinkFilter: string | null;
  projectsFromClient: string | null;
  rowsPerPage: number;
  status?: string;
  group?: string;
};

export type setFilterPayload = Dispatch<SetStateAction<filterPayload>>;

export interface peMappingResponse {
  success: boolean;
  message: string;
  data: peMappingItems[];
}

export interface peMappingItems {
  id: number;
  expert_invitation: null | "Invited" | "Accepted" | "Declined";
  state: string;
  fk_expert: number;
  expert_name: string;
  agenda_shared_on: string;
  agenda_responses: AgendaResponse[] | null;
  calls_completed: number | null;
  calls_scheduled: number | null;
  meta: {
    first_invite_sent_to_expert?: {
      state: string;
      date: Date
    }
  }
  relevant_division: string | null;
  relevant_designation: string | null;
  relevant_company: string | null;
}

export type GetPeMapping = {
  Added: peMappingItems[];
  Shared: peMappingItems[];
  Shortlisted: peMappingItems[];
  Scheduled: peMappingItems[];
};

type GroupValue = {
  id: number;
  type: string;
  label: string;
  sublabel: string;
};

// CLIENT TYPES

export type CLIENT_DataItem = {
  id: number;
  external_topic: string;
  applicable_agenda_id: number | null;
  account_manager: number;
  receiving_date: string;
  target_date: string;
  total_revenue: number;
  call_count: number;
  profile_shared: number;
  ce_done: number;
  client_value: ClientValue;
  geography_value: GeographyValue;
  account_manager_value: AccountManagerValue;
  l0_domain_value: DomainValue;
  l1_domain_value: DomainValue;
  l2_domain_value: DomainValue;
  l3_domain_value: DomainValue;
  fk_group_value: GroupValue;
  billing_office_value: billingOfficeValue;
};

export interface CLIENT___ProjectApiDataResponse {
  data: CLIENT_DataItem[];
  total: number;
  page: number;
  totalPages: number;
}
