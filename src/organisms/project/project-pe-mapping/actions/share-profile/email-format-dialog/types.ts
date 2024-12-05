interface Snippet {
  heading: string;
  description: string;
}

interface Award {
  date: string | null;
  title: string;
  description: string;
}

interface Patent {
  date: string | null;
  title: string;
  number: string;
  patent_url: string;
  description: string;
}

interface Education {
  course: string;
  start_year: string | null;
  end_year: string | null;
  institution: string;
}

interface WebHandle {
  link: string;
  portal: string;
}

interface Publication {
  date: string | null;
  title: string;
  description: string | null;
  publication: string;
  description_url: string | null;
}

interface Company {
  name: string;
  designation: string;
}

export interface WorkExperience {
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
}

export interface BankDetails {
  gst_name: string;
  bank_name: string;
  ifsc_code: string;
  gst_address: string;
  bank_address: string;
  account_number: string;
  account_holder_residing_country: string | null;
  account_holder_address: string | null;
  swift_code?: string;
  iban?: string;
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

interface Meta {
  snippets: Snippet[];
  awards: Award[];
  patents: Patent[];
  education: Education[];
  webhandles: WebHandle[];
  publications: Publication[];
  contact_medium: string;
  current_company: Company;
  relevant_company: Company;
  totalRatingCount: number;
  current_company_tag: string;
  time_multiplier: number;
}

interface ExpertGeography {
  id: number;
  name: string;
  type: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface ExpertDetails {
  expertise_in_these_geographies: string[];
  id: number;
  user_id: number;
  dob: string | null;
  name: string;
  salutation: string;
  address: string | null;
  source_link: string;
  status: string;
  badge: string | null;
  primary_mobile: string;
  additional_mobile_one: string | null;
  additional_mobile_two: string | null;
  all_mobile_numbers: string;
  headline: string | null;
  nicknames: string | null;
  functions: string;
  picture: string;
  no_pe_certificate: string | null;
  bio: string;
  internal_notes: string | null;
  note_visible_to_client: string | null;
  private_profile: boolean;
  dnd_enabled: boolean;
  premium_expert: boolean;
  primary_email: string;
  additional_email_one: string | null;
  additional_email_two: string | null;
  all_emails: string;
  tutorial_taken_timestamp: string;
  confirmed_on: string | null;
  agreement_signed_on: string;
  fk_creator: number;
  base_location: number;
  fk_project: number;
  referred_by: string | null;
  approved_by: string | null;
  updated_by: number;
  is_self_registered: boolean;
  external_rating: number | null;
  internal_rating: number | null;
  primary_bank: number | null;
  domain_l0: number;
  domain_l1: number;
  domain_l2: number;
  domain_l3: number | null;
  domain_other: string | null;
  currently_managed_by: string | null;
  price_per_hour_usd: number | null;
  price_per_hour: number | null;
  price_per_hour_currency: string | null;
  offlimit_topics: string | null;
  offlimit_companies: string | null;
  type: string;
  created_at: string;
  updated_at: string;
  call_count: number;
  meta: Meta;
  summary: string;
  base_location_value: ExpertGeography;
  fk_project_value: ProjectValue;
  domain_l0_value: DomainValue;
  domain_l1_value: DomainValue;
  primary_bank_value: PrimaryBankValue | null;
  domain_l2_value: DomainValue;
  domain_l3_value: DomainValue | null;
  updated_by_value: UpdatedByValue;
  fk_creator_value: UpdatedByValue;
  work_experiences: WorkExperience[];
  expert_geographies_value: ExpertGeography[];
}

interface ProjectValue {
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
}

interface DomainValue {
  id: number;
  type: string;
  created_at: string;
  updated_at: string;
}

interface UpdatedByValue {
  id: number;
  name: string;
  profile_picture: string;
}

export type getExpertDataReturn = {
  name: string;
  rel_company_date: string | null;
  curr_company_full: string | null;
  geography: string | null;
  work_history: string[];
  charges: string | null;
  premium_expert: string;
};
