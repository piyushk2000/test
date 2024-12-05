import { EXPERT_DETAILS, WebPortal, WorkExperience } from "../../pages/Experts/types";

export type PersonalInfo = {
  action: "PersonalInfo";
  id: number;
  salutation: string;
  name: string;
  dob: string;
  primary_email: string;
  primary_mobile: string;
  additional_email_one: string | null;
  additional_email_two: string | null;
  additional_mobile_one: string | null;
  additional_mobile_two: string | null;
};

export type DefaultPersonalInfo = {
  salutation: string;
  name: string;
  dob: string;
  additional_email_one: string | null;
  additional_email_two: string | null;
  additional_mobile_one: string | null;
  additional_mobile_two: string | null;
};

export type BasicInfo = {
  action: "BasicInfo";
  id: number;
  headline: string;
  price_per_hour: string;
  price_per_hour_currency: string;
  functions: string;
  domain_other: string;
};

export type DefaultBasicInfo = {
  headline: string;
  price_per_hour: string;
  price_per_hour_currency: string;
  functions: string;
  domain_other: string;
  current_base_location: {label: string, value: number};
  expert_geographies: {label: string, value: number}[];
};

export type AboutInfo = {
  action: "AboutInfo";
  bio: string;
  id: number;
}

export type DefaultAboutInfo = {
  bio: string;
}

export type EducationInfo = {
  action: "EducationInfo";
  id: string;
  education: Education[];
};

export type Education = {
  course: string;
  institution: string;
  start_year: string | null;
  end_year: string | null;
};

export type PublicationInfo = {
  action: "PublicationInfo";
  id: string;
  publications: Publication[];
};

export type Publication = {
  title: string;
  description: string | null;
  publication: string | null;
  description_url: string | null;
  date: string | null;
};

export type PatentInfo = {
  action: "PatentInfo";
  id: string;
  patents: Patent[];
};

export type Patent = {
  title: string;
  description: string | null;
  number: string;
  patent_url: string | null;
  date: string | null;
};

export type SnippetInfo = {
  action: "SnippetInfo";
  id: string;
  snippets: Snippet[];
};

export type Snippet = {
  heading: string;
  description: string;
};

export type AwardsInfo = {
  action: "AwardsInfo";
  id: string;
  awards: Award[];
};

export type Award = {
  title: string;
  description: string;
  date: string | null;
};

export type WebHandleInfo = {
  action: "WebHandleInfo";
  id: string;
  webhandles: WebHandle[];
};

export type WebHandle = {
  portal: WebPortal;
  link: string;
};

export type Company = {
  id?: number;
  action?: string;
  company: string;
  end_date?: string | null;
  location: string;
  fk_company: number;
  start_date: string;
  designation: string;
  job_description: string;
  currently_works_here: boolean;
};

export type Snapshot = {
  id?: number;
  action: string;
  status: string;
  company: string;
  end_date: string | null;
  location: string;
  expert_id: number;
  created_at: string;
  fk_company: number;
  fk_creator: number;
  start_date: string;
  updated_at: string;
  updated_by: number;
  designation: string;
  job_description: string;
  currently_works_here: boolean;
};

export type CompanyInfo = {
  id: string;
  action: "CompanyInfo";
  companies: Company[];
  current_snapshot: Snapshot[];
};

export type ExpertPendingApprovals = {
  personalInfo: {
    default: DefaultPersonalInfo | null;
    new: ProfileEdit<PersonalInfo> | null;
  };
  basicInfo: {
    default: DefaultBasicInfo | null;
    new: ProfileEdit<BasicInfo> | null;
  };
  aboutInfo: {
    default: DefaultAboutInfo | null;
    new: ProfileEdit<AboutInfo> | null;
  }
  CompanyInfo: {
    default: WorkExperience | null;
    new: ProfileEdit<CompanyInfo>;
  }[];
  educationInfo: {
    default: Education[] | null;
    new: ProfileEdit<EducationInfo> | null;
  };
  awardsInfo: {
    default: Award[] | null;
    new: ProfileEdit<AwardsInfo> | null;
  };
  publicationInfo: {
    default: Publication[] | null;
    new: ProfileEdit<PublicationInfo> | null;
  };
  patentInfo: {
    default: Patent[] | null;
    new: ProfileEdit<PatentInfo> | null;
  };
  weHandleInfo: {
    default: WebHandle[] | null;
    new: ProfileEdit<WebHandleInfo> | null;
  };
  profileEditLength: number | null;
  expertProfileInfo:EXPERT_DETAILS | null
};

export type ExpertPendingApprovalsContextType = {
  refetch(): Promise<void>;
  setData: React.Dispatch<React.SetStateAction<ExpertPendingApprovals | null>>;
};

export type InfoNameType =
  | "personalInfo"
  | "basicInfo"
  | "educationInfo"
  | "awardsInfo"
  | "publicationInfo"
  | "patentInfo"
  | "weHandleInfo"
  | "CompanyInfo";

/*
  ==================================
      PROFILE EDIT
  ==================================
*/

export type ProfileEdit<T> = {
  id: number;
  fk_expert: number;
  payload: T | null;
  fk_editor: number;
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_by: number | null;
  remark: string | null;
  action: string;
};

export type GetProfileEdit = {
  success: boolean;
  message: string;
  data: ProfileEdit<
    | PersonalInfo
    | BasicInfo
    | EducationInfo
    | AwardsInfo
    | PublicationInfo
    | PatentInfo
    | WebHandleInfo
    | CompanyInfo
    | AboutInfo
  >[];
};
