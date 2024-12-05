import { LocalDayjs } from "../../utils/timezoneService";

export const defaultValues = {
  topic: null,
  external_topic: null,
  description: null,
  client_id: null,
  billing_office: null,
  customer: [],
  case_code: [],
  no_of_calls: null,
  priority: null,
  target_date: null,
  receiving_date: LocalDayjs(),
  client_geography: null,
  expert_geographies: [],
  account_manager: null,
  research_analysts: [],
  l0_domain: null,
  l1_domain: null,
  l2_domain: null,
  l3_domain: null,
  domain_others: [],
  functions: [],
  target_companies: [],
  fk_group: "",
  offlimit_topics: [],
  offlimit_companies: []
};

export type payload = {
  description: string | null;
  topic: string;
  external_topic: string;
  action: string;
  client_id: number;
  client_geography: number;
  expert_geographies: number[];
  account_manager: number;
  research_analysts: number[];
  l0_domain: number;
  l1_domain: number;
  l2_domain: number;
  l3_domain: number;
  functions: string;
  receiving_date: string | null; // Date in ISO 8601 format (e.g., "2022-12-31")
  billing_office: number | null;
  domain_others: string | null;
  client_contacts: number[] | null;
  case_code: string[] | null;
  target_date: string | null; // Date in ISO 8601 format (e.g., "2023-07-31")
  priority: string | null;
  no_of_calls: number;
  target_companies: string | null;
  fk_group: string;
  offlimit_topics: string | null;
  offlimit_companies: string | null;
};

export type Option = {
  label: string;
  value: string;
};
