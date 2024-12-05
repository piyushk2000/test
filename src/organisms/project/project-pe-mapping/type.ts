import { Dispatch, SetStateAction } from "react";
import {
  SelectedAction,
  SetSelectedAction,
} from "../../../molecules/nav-bar-common/type";
import { NumberQuestion } from "../../compliances/autoAprovalDialog/types";
import { Data } from "./list-view/types";

export type SelectedCards = {
  label: string;
  value: number;
  company: string;
  designation: string;
  pe_id: number | null;
  expert_id: number | null;
  expert_name: string | null;
  location: string | null;
  is_agenda_respond: boolean;
  snippet: string | null;
  meta: MetaType;
  charges: string | null;
  badge: "Ace" | "Champion" | "Pro" | null;
};

export type SelectExpert = {
  isSelected: boolean;
  selectedCards: Array<SelectedCards>;
};

export type SetSelectExpert = Dispatch<SetStateAction<SelectExpert>>;

export type shortlistExpertTypes = {
  name: string;
  company: string;
  designation: string;
} | null;

export type isDialogState = {
  actions: {
    bulkRevert: {
      state: boolean;
    }
    shareProfile: {
      state: boolean;
      isChange: boolean;
      pe_id: number | null;
      expert_id: number | null;
      company: string | null;
      designation: string | null;
      location: string | null;
      is_agenda_respond: boolean;
      email_format: boolean;
      snippet: string | null;
      meta: MetaType;
      charges: string | null;
    };
    ShareComplianceWithExpert: {
      state: boolean;
      pe_id: number | null;
      client_id: number | null;
      is_edit?: boolean;
    };
    ShareComplianceWithClient: {
      state: boolean;
      pe_compliance: PeComplianceData | null;
      client_id: number | null;
      email_format: boolean;
      snippet: string | null;
      expert_id: number | null;
      company: string | null;
      designation: string | null;
      meta: MetaType;
    };
    reviewCompliance: {
      state: boolean;
      pe_compliance: PeComplianceData | null;
      snippet: string | null;
      expert_id: number | null;
      company: string | null;
      designation: string | null;
      meta: MetaType;
    };
    shortlist: {
      state: boolean;
      isChange: boolean;
      pe_id: number | null;
      expert: shortlistExpertTypes;
      is_multiple: boolean;
    };
    scheduleCall: {
      state: boolean;
      isChange: boolean;
      pe_id: number | null;
      project_id: string | null;
      expert_name: string | null;
    };
    revertReject: {
      state: boolean;
      pe_id: number | null;
      show_compliance_status?: boolean;
      is_auto_rejected?: boolean;
    };
    inviteExpert: {
      state: boolean;
      project_id: string | null;
      pe_id: string | null;
      isReInvite: boolean;
      isMultiple: boolean;
    };
    shareProfileExperts: {
      state: boolean;
      project_id: string | null;
      pe_id: number | null;
      isChange: boolean;
      reaarange_expert: boolean;
      email_format: boolean;
      experts:SharedProfiles[];
    };
    pendingCompliance: {
      state: boolean;
      pe_id: number | null;
      is_multiple: boolean;
    };
    shareAgenda: {
      pe_id: number | null;
      state: boolean;
    };
    showAnswers: {
      state: boolean;
      answers:NumberQuestion[] | null;
      show_reviewed_by?: {name: string, date: string, status: string};
      proof_url?: string;
      showReAnswerBtn?: {unique_code: string} | null;
    },
    showComplianceQuestions: {
      state: boolean;
      pe_compliance:  PeComplianceData | null;
    }
  };
  filter: {
    state: boolean;
    isChange: boolean;
    filterText: string | null;
    isFiltersApplied: boolean;
    searchText: string | null;
    status: Array<string>;
  };
  iconDefine: {
    isOpen: boolean;
  };
};


export type SharedProfiles={
  pe_id: number | null;
  expert_id: number | null;
  expert_name: string | null;
  company: string | null;
  designation: string | null;
  location: string | null;
  is_agenda_respond: boolean;
  email_format: boolean;
  snippet: string | null;
  meta: MetaType;
  charges: string | null;
  badge: "Ace" | "Champion" | "Pro" | null;
}

export type setDialogState = Dispatch<SetStateAction<isDialogState>>;

export type PeMappingContextType = {
  refetch: () => Promise<void>;
  setPeDialog: setDialogState;
  isDialog: isDialogState;
  selectExpert: SelectExpert;
  setSelectExpert: SetSelectExpert;
  selectedAction: SelectedAction;
  setSelectedAction: SetSelectedAction;
};

export type AlertNBackdropOpen = {
  openAlertBox: boolean;
  isBackdrop: boolean;
};

export type SelectedProjectApiResponse = {
  data: {
    applicable_agenda_id: number;
    account_manager: number;
    fk_group: number;
    client_id: number;
  }[];
  total: number;
  page: number;
  totalPages: number;
};

export type GroupApiResponse = {
  data: {
    id: number;
    label: string;
    sublabel: string;
    type: "Group"
  }[]
  total: number;
  page: number;
  totalPages: number;
}

export type setAlertNBackdropOpen = Dispatch<
  SetStateAction<AlertNBackdropOpen>
>;

interface AgendaResponse {
  answer: string;
  question: string;
  expert_note: string | null;
}

export type CSCValues =
  | "Not Required"
  | "Before sharing profile"
  | "Before scheduling the call"
  | "To be sent after scheduling the call and must be completed before logging the call"
  | "Before logging the call";

export type MetaType = {
  snippet?: string;
  cost_price?:string;
  selling_price?: number;
  snippet_title?: string;
  time_multiplier?: number;
  selling_price_currency?: string;
  csc_marked_completed_by_name?: string;
  project_invitation_link?: string;
  first_invite_sent_to_expert?:{
    date:Date,
    state:string,
  }
};

export interface projectExpertGetApiData {
  id: number;
  expert_invitation: string | null;
  state: string;
  fk_expert: number;
  expert_name: string;
  relevant_company: string;
  relevant_designation: string;
  relevant_division: string | null;
  agenda_responses: AgendaResponse[] | null;
  agenda_shared_on: string | null;
  relevant_company_location: string | null;
  meta: MetaType;
  calls_scheduled: number | null;
  client_specific_compliance_requirement: CSCValues;
  applicable_agenda_id: null | number;
  csc_marked_completed_by?: number;
  csc_marked_completed_on?: string;
  compliance_shared?: boolean;
  client_compliance_requirement: string;
  calls_completed: number | null;
}

export interface ExpertApiResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: number,
    name: string,
    badge:  "Ace" | "Champion" | "Pro" | null
  }>
}

export interface projectExpertGetApi {
  success: boolean;
  message: string;
  data: projectExpertGetApiData[];
}

export type projectPEMappingDataState = {
  peMappingData: projectExpertGetApiData[] | null;
  peListData: Data[] | null;
  projectData:any;
};

export type SetProjectPEMappingDataState = Dispatch<
  SetStateAction<projectPEMappingDataState>
>;

// Interface for each answer object
export interface PeComplianceAnswer {
  qid: number | string;
  type: "enum" | "number" | "text";
  options?: string[];
  show_if?: {
    qid: string;
    chosen_option_position: number;
  };
  question: string;
  mandatory: number;
  correct_answer?: number;
  respondant_answer?: string;
  auto_reject_on_incorrect_answer: number;
  max_length?: number;
  min_length?: number;
  max_value?: number;
  min_value?: number;
}

type UserInfo = {name: string, id: number, role: string}

// Interface for each data object
export interface PeComplianceData {
  id: number;
  unique_code: string;
  fk_client: number;
  fk_project: number;
  fk_expert: number;
  fk_pe: number;
  fk_compliance: number;
  manually_verified: boolean | null;
  status: string;
  answers: PeComplianceAnswer[] | null;
  meta: {client_compliance_proof_url?: string, expert_compliance_proof_url?: string} | null;
  shared_with_expert_by: number;
  shared_with_expert_by_value?: UserInfo;
  shared_with_expert_on: string;
  answered_by: number | null;
  answered_by_value?: UserInfo;
  answered_on: string | null;
  shared_with_client_by: number | null;
  shared_with_client_by_value?: UserInfo;
  shared_with_client_on: string | null;
  reviewed_by: number | null;
  reviewed_by_value?: UserInfo;
  reviewed_on: string | null;
  final_reviewed_by: number | null;
  final_reviewed_by_value?: UserInfo;
  final_reviewed_on: string | null;
  created_at: string;
  updated_at: string;
  createdAt: string;
  updatedAt: string;
}

// Interface for the entire response object
export interface GetPeComplianceResponseAPI {
  success: boolean;
  message: string;
  data: PeComplianceData[];
}



export type ComplianceStartAfterType = "Shared" | "Shortlisted" | "Scheduled" | "Not Required";
export type ComplianceEndBeforeType = "Shortlisted" | "Scheduled" | "Completed";