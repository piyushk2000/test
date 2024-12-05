import { Dispatch, SetStateAction } from "react";
import { PrimaryBankValue } from "../../organisms/project/project-pe-mapping/actions/share-profile/email-format-dialog/types";
import { Dayjs } from "dayjs";

export type IsCalenderTypes = {
  open: boolean;
  value: string;
  select: "between" | "on" | "before" | "after" | null;
  date: Dayjs | null,
  tDate: Dayjs | null,
};

export type SetCalender = Dispatch<SetStateAction<IsCalenderTypes>>;

export type CallDetails = CallDetail[];

export interface CallDetail {
  id: number;
  title: string;
  client_participants: string;
  invitation_text: any;
  fk_expert: number;
  fk_client: number;
  fk_project: number;
  fk_pe: number;
  status: string;
  call_medium: string;
  call_medium_reason: string;
  scheduled_start_time: string;
  scheduled_end_time: string;
  invoice_url?: string;
  reviewed_by?: { name: string, id: number } | null,
  reviewed_on?: string | null;
  review_remarks?: string | null;
  billing_office_id: number;
  casecode: string;
  call_start_time: string;
  selling_price: number;
  call_status: string;
  selling_price_currency: string;
  chargeable_mins: number;
  cost_price: number;
  cost_price_currency: string;
  payable_mins: number;
  client_contact: string;
  account_manager: string;
  research_analyst: string;
  expert_rating: number;
  expert_type: string;
  call_type: string;
  geographies: string;
  revenue_in_inr: number;
  revenue_in_usd: number;
  exchange_rate_chargeable: number;
  exchange_rate_payable: number;
  call_link?: string;
  remark: any;
  created_at: any;
  updated_at: any;
  fk_project_value: FkProjectValue;
  billing_office_id_value: BillingOfficeIdValue;
  fk_expert_value: FkExpertValue;
  fk_client_value: FkClientValue;
  zoom_meeting_id: string | null;
}

export type SetCallDetail = Dispatch<SetStateAction<CallDetails | null>>;

export interface FkProjectValue {
  expert_geographies: string[];
  research_analysts: string[];
  client_contacts: string[];
  case_code: string[];
  id: number;
  topic: string;
  applicable_agenda_id: number;
  client_id: number;
  fk_group: number;
  client_name: string;
  client_geography: number;
  account_manager: number;
  l0_domain: number;
  l1_domain: number;
  l2_domain: number;
  l3_domain: number;
  functions: string;
  receiving_date: string;
  created_at: string;
  updated_at: string;
  billing_office: number;
  domain_others: string;
  target_date: string;
  priority?: string;
  status: string;
  no_of_calls: number;
  target_companies: string;
  description: string;
  total_revenue: number;
  call_count: number;
  profile_shared: number;
  ce_done: number;
}

export interface BillingOfficeIdValue {
  id: number;
  name: string;
  entityName: string;
  address: string;
  city: string;
  country: string;
  GSTIN?: string;
  client_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface FkExpertValue {
  id: number;
  name: string;
  primary_mobile: string;
  primary_email: string;
  primary_bank: null | any;
  primary_bank_value: { id: number; bank_country_code: string, gstin: string | null   } | null;
  no_pe_certificate: null | any;
}

export interface FkClientValue {
  id: number;
  name: string;
}

export type UsersApi = {
  success: boolean;
  message: string;
  data: Users;
};

export type Users = {
  id: number;
  name: string;
  email: string;
  mobile: string;
}[];

export type ClientContact = {
  id: number;
  name: string;
}[];

export type SelectedCards = CallDetail & { value: number };

export type Select = {
  isClicked: boolean;
  selectedCards: SelectedCards[];
  callAction: "Paid" | "UnPaid" | "Request_Payment" | "generate_invoice" | "Submit Payment Request" | "Change Casecode" | null;
};

export type SetSelect = Dispatch<SetStateAction<Select>>;

export type RequestPaymentAPI = {
  success: string;
  message: string;
  data: null;
};

export type filterPayload = {
  sort: string;
  search: string | null;
  calender: string | null;
  expert_type: string;
  status: string;
  call_medium: string;
  rowsPerPage: number;
  search_by_id: string;
  search_by_project_id: string;
  search_by_expert_id: string;
  casecode: string;
  isBadCall: boolean;
  NoER: boolean;
  isFilterApplied: boolean; // True, if any filter is applied else false
};

export type setFilterPayload = Dispatch<SetStateAction<filterPayload>>;

export type GetGstResponse = {
  success: boolean;
  message: string;
  data: {
    gstin: null;
  }[];
};

export type getFullBankDetailsResponse = {
  success: boolean;
  message: string;
  data: PrimaryBankValue[];
};

export type getExpertResponse = {
  success: boolean;
  message: string;
  data: {
    name: string;
    primary_mobile: string;
    primary_email: string;
  }[];
};

export type paymentReceiptModalTypes = {
  state: boolean;
  expert_name: string | null;
};

export type GenerateInvoiceTypes = {
  state: boolean;
  bank_details: PrimaryBankValue | null;
};

export type SetPaymentReceiptModalTypes = Dispatch<
  SetStateAction<paymentReceiptModalTypes>
>;

export type DeleteCallDialog = {
  state: boolean;
  call_id: number | null;
};

export type SetDeleteCallDialog = Dispatch<SetStateAction<DeleteCallDialog>>;

export type ConfirmCallDialogType = {
  state: boolean;
  call_id: number | null;
};

export type SetConfirmCallDialogType = Dispatch<SetStateAction<ConfirmCallDialogType>>;

export type ChoosePaymentRequestTypes = {
  state: boolean;
  callDetail: CallDetail | null;
}

export type SetChoosePaymentRequestTypes = Dispatch<SetStateAction<ChoosePaymentRequestTypes>>;

export type ShowReviewTypes = {
  state: boolean;
  callDetail: CallDetail | null;
  review_type: "FINANCE" | "CALL" | null;
}

export type SetShowReviewTypes = Dispatch<SetStateAction<ShowReviewTypes>>;

export type AddRemarkTypes = {
  state: boolean;
  callDetail: CallDetail | null;
}

export type SetAddRemarkTypes = Dispatch<SetStateAction<AddRemarkTypes>>;


export type ResponseZohoPaymentReceiptsTypes = {
  success: boolean,
  message: string,
  data: {
    id: string,
    filename: string,
    data: any
  }[]
}