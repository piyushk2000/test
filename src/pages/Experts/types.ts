import { Dispatch, SetStateAction } from "react";

export type filterPayload = {
  dateFilter: any;
  typeFilter: any;
  advanceFilter: any;
  isFilterChange: boolean;
  rowsPerPage: number;
  sortFilter: any;
  statusFilter: string[];
  badgeFilter: string[];
  searchFilter: string | null;
  pending_approvals: boolean;
  otherSearchFilter: {
    id: string;
    name: string;
    nick_name: string;
    email: string;
    mobile: string;
    headline: string;
    bio: string;
    functions: string;
    company: string;
    domain: string;
    work_division: string;
  };
  timelineFilters: {
    actor: any;
    action: string | null;
    date: string | null;
    filterAdded: boolean;
    isFilterChange: boolean;
  };
};

export type SetFilterPayload = Dispatch<SetStateAction<filterPayload>>;

export type selectedCardsTypes = { label: string; value: number }[];
export type setSelectedCardsTypes = Dispatch<
  SetStateAction<selectedCardsTypes>
>;

export type AlertNBackdrop = {
  alert: boolean;
  backdrop: boolean;
};

export type SetAlertNBackdrop = Dispatch<SetStateAction<AlertNBackdrop>>;

export type Dialogs = {
  addToStaging: boolean;
  addToProject: boolean;
  timelineFilters: boolean;
  timeline: { state: boolean; data: any; messages: any; id: string | null };
};

export type setDialogs = Dispatch<SetStateAction<Dialogs>>;

/*
  ==========================================
      EXPERT TYPES
  ==========================================
*/

type Award = {
  date: string | null;
  title: string;
  description: string;
};

type Patent = {
  date: string | null;
  title: string;
  number: string;
  patent_url: string | null;
  description: string | null;
};

type Snippet = {
  heading: string;
  description: string;
};

type Education = {
  course: string;
  end_year: string | null;
  start_year: string | null;
  institution: string;
};

export type WebPortal =
  | "Linkedin"
  | "Twitter"
  | "Facebook"
  | "Instagram"
  | "GitHub"
  | "Youtube"
  | "personal"
  | "Any_Other";

type WebHandle = {
  portal: WebPortal;
  link: string;
};

type Publication = {
  date: string | null;
  title: string;
  description: string | null;
  publication: string | null;
  description_url: string | null;
};

export type WorkExperience = {
  id: number;
  company: string;
  location: string | null;
  fk_company: number;
  status: string;
  designation: string;
  job_description: string;
  expert_id: number;
  start_date: string;
  end_date: string | null;
  currently_works_here: boolean;
  fk_creator: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
};

type ContactMedium = "Mobile" | "Email";

type CurrentCompany = {
  name: string;
  designation: string;
};

type RelevantCompany = {
  name: string;
  designation: string;
};

type ExpertiseInGeography = {
  id: number;
  name: string;
  type: string;
  created_at: string | null;
  updated_at: string | null;
};

type Meta = {
  awards: Award[];
  patents: Patent[];
  snippets: Snippet[];
  education: Education[];
  webhandles: WebHandle[];
  publications: Publication[];
  contact_medium: ContactMedium;
  current_company: CurrentCompany;
  relevant_company: RelevantCompany;
  totalRatingCount: number;
  current_company_tag: string;
};

type BaseLocationValue = {
  id: number;
  name: string;
  type: string;
  created_at: string | null;
  updated_at: string | null;
};

type FKProjectValue = {
  expert_geographies: string[];
  research_analysts: string[];
  client_contacts: string[];
  case_code: string[];
  sibling_projects: string[];
  id: number;
  topic: string;
  external_topic: string;
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
  priority: string;
  status: string;
  no_of_calls: number;
  target_companies: string;
  description: string;
  total_revenue: number;
  call_count: number;
  profile_shared: number;
  ce_done: number;
};

type DomainValue = {
  id: number;
  name: string;
  parent_id: number | null;
  level: string;
  created_at: string;
  updated_at: string;
};

type BankDetails = {
  gst_name: string;
  bank_name: string;
  ifsc_code: string;
  gst_address: string;
  bank_address: string;
  account_number: string;
};

type PrimaryBankValue = {
  id: number;
  fk_expert: number;
  country: string;
  bank_country_code: string;
  bank_details: BankDetails;
  gstin: string;
  pan: string;
  account_holder_name: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
};

export type EXPERT_DETAILS = {
  expertise_in_these_geographies: number[];
  id: number;
  user_id: number;
  dob: string;
  name: string;
  salutation: string;
  address: string | null;
  source_link: string;
  status: string;
  badge: string | null;
  primary_mobile: string;
  additional_mobile_one: string;
  additional_mobile_two: string;
  all_mobile_numbers: string;
  headline: string;
  nicknames: string;
  functions: string;
  picture: string | null;
  no_pe_certificate: string | null;
  bio: string;
  internal_notes: string | null;
  note_visible_to_client: string | null;
  private_profile: boolean;
  dnd_enabled: boolean;
  premium_expert: boolean;
  primary_email: string;
  additional_email_one: string;
  additional_email_two: string;
  all_emails: string;
  tutorial_taken_timestamp: string;
  confirmed_on: string | null;
  agreement_signed_on: string;
  fk_creator: number;
  base_location: number;
  fk_project: number;
  pending_edits: number;
  referred_by: number | null;
  approved_by: number | null;
  updated_by: number;
  is_self_registered: boolean;
  external_rating: number;
  internal_rating: number;
  primary_bank: number;
  domain_l0: number;
  domain_l1: number;
  domain_l2: number;
  domain_l3: number;
  domain_other: string;
  currently_managed_by: number | null;
  price_per_hour_usd: number;
  price_per_hour: string;
  price_per_hour_currency: string;
  offlimit_topics: string;
  offlimit_companies: string;
  offlimit_geographies: string;
  offlimit_analysts: string;
  offlimit_customers: string;
  offlimit_time: string;
  updated_at: string;
  created_at: string;
  meta: Meta;
  base_location_value: BaseLocationValue;
  fk_project_value: FKProjectValue;
  domain_value: DomainValue;
  primary_bank_value: PrimaryBankValue;
  work_experiences: WorkExperience[];
  expert_geographies_value: {
    id: number;
    name: string;
    type: string;
    updated_at: null | string;
    created_at: null | string;
  }[]
};

export type ExpertControllerRef = {
  controller: AbortController | null,
  clearTimeout: (() => void) | null
};