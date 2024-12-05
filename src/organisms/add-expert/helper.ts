export type FormInputProps = {
  name_salutations: any;
  name: string;
  firstname:string;
  lastname:string;
  current_base_location: any;
  isd_code: { label: string; value: string } | null;
  mobile_number: string;
  email: string;
  source_link: string;
  mapped_project: any;
  current_company: { label: string; value: string } | null;
  current_company_name: string;
  current_designation: string;
  portal: string;
  relevant_company: { label: string; value: string } | null;
  relevant_company_name: string;
  relevant_designation: string;
  expert_geographies: object[];
  l1_domain: any;
  l2_domain: any;
  l0_domain: any;
  l3_domain: any;
  other_domains: string[];
  functions: string[];
  offlimit_topics: string[];
  offlimit_companies: string[];
  internal_notes: string;
  remarks_visible_to_client: string;
  type_of_expert:
    | "Expert"
    | "Referral Admin"
    | "Expert | Referral Admin"
    | null;
  is_referred: string;
  referred_by: any;
  status: string;
  updated_at?: Date | null
};

export const DefaultValues: FormInputProps = {
  name_salutations: { label: "Mr.", value: "Mr." },
  name: "",
  firstname:"",
  lastname:"",
  current_base_location: null,
  isd_code: null,
  mobile_number: "",
  email: "",
  source_link: "",
  mapped_project: null,
  current_company: null,
  portal: "",
  current_company_name: "",
  current_designation: "",
  relevant_company: null,
  relevant_company_name: "",
  relevant_designation: "",
  expert_geographies: [],
  l1_domain: "",
  l2_domain: "",
  l0_domain: "",
  l3_domain: "",
  other_domains: [],
  functions: [],
  internal_notes: "",
  remarks_visible_to_client: "",
  type_of_expert: null,
  is_referred: "",
  referred_by: null,
  status: "",
  offlimit_topics: [],
  offlimit_companies: [],
  updated_at: null ,
};
