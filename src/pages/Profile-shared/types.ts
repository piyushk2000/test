import { Dispatch, SetStateAction } from "react";
import { PeComplianceData } from "../../organisms/project/project-pe-mapping/type";
import { BankDetails } from "../../organisms/project/project-pe-mapping/actions/share-profile/email-format-dialog/types";

export interface DetailedExpert {
  expertise_in_these_geographies: string[];
  id: number;
  user_id: number;
  dob: string;
  name: string;
  salutation: string;
  address: any;
  source_link: string;
  status: string;
  badge: string;
  primary_mobile: string;
  additional_mobile_one: any;
  additional_mobile_two: any;
  all_mobile_numbers: string;
  headline: string;
  nicknames: string;
  functions: string;
  picture: string;
  no_pe_certificate: any;
  bio: string;
  internal_notes: string;
  note_visible_to_client: string;
  private_profile: boolean;
  dnd_enabled: boolean;
  premium_expert: boolean;
  primary_email: string;
  additional_email_one: any;
  additional_email_two: any;
  all_emails: string;
  tutorial_taken_timestamp: string;
  confirmed_on: any;
  agreement_signed_on: string;
  fk_creator: number;
  base_location: number;
  fk_project: number;
  referred_by: any;
  approved_by: any;
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
  currently_managed_by: any;
  price_per_hour_usd: any;
  price_per_hour: number;
  price_per_hour_currency: string;
  offlimit_topics: any;
  offlimit_companies: any;
  type: string;
  created_at: string;
  updated_at: string;
  call_count: number;
  meta: Meta4;
  summary: string;
  base_location_value: BaseLocationValue;
  fk_project_value: FkProjectValue;
  domain_l0_value: DomainL0Value;
  domain_l1_value: DomainL1Value;
  primary_bank_value: PrimaryBankValue;
  domain_l2_value: DomainL2Value;
  domain_l3_value: DomainL3Value;
  updated_by_value: UpdatedByValue;
  fk_creator_value: FkCreatorValue;
  work_experiences: WorkExperience[];
  expert_geographies_value: ExpertGeographiesValue[];
}

export interface Meta4 {
  awards: Award[];
  snippets: Snippet[];
  education: Education[];
  publications: Publication[];
  contact_medium: string;
  current_company: any;
  relevant_company: RelevantCompany;
  totalRatingCount: number;
  current_company_tag: string;
}

export interface Award {
  date: string;
  title: string;
  description: string;
}

export interface Snippet {
  heading: string;
  description: string;
}

export interface Education {
  course: string;
  end_year: string;
  start_year: string;
  institution: string;
}

export interface Publication {
  date: string;
  title: string;
  description: string;
  publication: string;
  description_url: string;
}

export interface RelevantCompany {
  name: string;
  designation: string;
}

export interface BaseLocationValue {
  id: number;
  name: string;
  type: string;
  created_at: any;
  updated_at: any;
}

export interface FkProjectValue {
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
  priority: any;
  status: string;
  no_of_calls: number;
  target_companies: string;
  description: string;
  total_revenue: number;
  call_count: number;
  profile_shared: number;
  ce_done: number;
}

export interface DomainL0Value {
  id: number;
  name: string;
  parent_id: any;
  level: string;
  created_at: string;
  updated_at: string;
}

export interface DomainL1Value {
  id: number;
  name: string;
  parent_id: number;
  level: string;
  created_at: string;
  updated_at: string;
}

export interface PrimaryBankValue {
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
}

export interface DomainL2Value {
  id: number;
  name: string;
  parent_id: number;
  level: string;
  created_at: string;
  updated_at: string;
}

export interface DomainL3Value {
  id: number;
  name: string;
  parent_id: number;
  level: string;
  created_at: string;
  updated_at: string;
}

export interface UpdatedByValue {
  id: number;
  role: string;
  timezone: string;
  name: string;
  email: string;
  username: string;
  mobile: string;
  password: string;
  picture: any;
  added_by: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  otp: any;
  last_otp_generated_at: string;
  otp_attempts: number;
  otp_expiry: string;
  block_expiry: any;
  meta: Meta2;
}

export interface Meta2 {}

export interface FkCreatorValue {
  id: number;
  role: string;
  timezone: string;
  name: string;
  email: string;
  username: string;
  mobile: string;
  password: string;
  picture: any;
  added_by: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  otp: any;
  last_otp_generated_at: string;
  otp_attempts: number;
  otp_expiry: string;
  block_expiry: any;
  meta: Meta3;
}

export interface Meta3 {}

export interface WorkExperience {
  id: number;
  company: string;
  location: string;
  fk_company: number;
  status: string;
  designation: string;
  job_description: string;
  expert_id: number;
  start_date: string;
  end_date?: string;
  currently_works_here: boolean;
  fk_creator: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export type ProfileSharedContextTypes = {
  filterPayload: FilterPayload;
  setFilterPayload: SetFilterPayload;
  expertData: Expert[] | null;
  loading: boolean;
  projectId: string | null;
  FullExpertData: Expert[] | null;
  projectDetails: ProjectDetails | null;
  projectClientDetails: {isAllowed: boolean};
};

export interface ExpertGeographiesValue {
  id: number;
  name: string;
  type: string;
  created_at: any;
  updated_at: any;
}

export interface Expert {
  id: number;
  calls_scheduled?: number;
  calls_completed?: number;
  client_specific_compliance_requirement: string;
  client_compliance_requirement: string;
  expert_invitation?: string;
  agenda_status?: string;
  state: string;
  fk_project: number;
  csc_marked_completed_by: any;
  csc_marked_completed_on: any;
  fk_expert: number;
  fk_workex: number;
  expert_name: string;
  relevant_company: string;
  relevant_company_location: any;
  relevant_designation: string;
  agenda_shared_on?: string;
  fk_agenda?: number;
  agenda_responses?: AgendaResponse[];
  compliance_shared: boolean;
  compliance_responses: any;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  meta: Meta;
  premium_expert: boolean;
  badge: string | null;
  picture: string | null;
}

export interface FkExpert {
  premium_expert: boolean;
  badge: string | null;
  picture: string | null;
  id: number;
}

export type SetFkExpert = Dispatch<SetStateAction<FkExpert>>;

export type SetExpert = Dispatch<SetStateAction<Expert[] | null>>;

export interface AgendaResponse {
  answer: string;
  expert_note: string;
  question: string;
}

export interface Meta {
  snippet?: string;
  selling_price?: number;
  snippet_title?: string;
  time_multiplier?: number;
  selling_price_currency?: string;
  project_invitation_link?: string;
  shared_on?: string;
}

export type FilterPayload = {
  state: string;
  complianceChecked: boolean;
  isFilterChange: boolean;
  sort_by: string;
  date_url: string | null;
};

export type SetFilterPayload = Dispatch<SetStateAction<FilterPayload>>;

export type ProjectDetails = {
  id: number;
  call_count: number;
  total_revenue: number;
  external_topic: string;
  applicable_agenda_id: number | null;
};

export type SetProjectDetails = Dispatch<SetStateAction<ProjectDetails | null>>;


export type PECompliance = PeComplianceData[];
export type SetPECompliance = Dispatch<SetStateAction<PECompliance>>