import { Dayjs } from "dayjs";
import { labelValue, projectApiDataItem } from "../../pages/Projects/types";
import { LocalDayjs } from "../../utils/timezoneService";
import { Dispatch, SetStateAction } from "react";

export type formDefaultValues = {
  topic: string;
  external_topic: string;
  description: string | null;
  client_id: labelValue | null;
  billing_office: labelValue | null;
  customer: labelValue[] | null;
  case_code: string[];
  no_of_calls: string;
  priority: string | labelValue | null;
  target_date: Dayjs | null;
  receiving_date: Dayjs;
  client_geography: labelValue;
  expert_geographies: labelValue[];
  account_manager: labelValue | null;
  research_analysts: labelValue[];
  l0_domain: labelValue;
  l1_domain: labelValue;
  l2_domain: labelValue;
  l3_domain: labelValue | null;
  domain_others: string[];
  functions: string[];
  target_companies: string[];
  fk_group: string | labelValue | null;
  offlimit_topics: string[];
  offlimit_companies: string[];
};

const formatDataArr = (data: any[]): labelValue[] => {
  const formattedData: labelValue[] = [];
  if (data && data.length) {
    data.forEach((item: any) => {
      formattedData.push(formatData(item));
    });
  }

  return formattedData;
};

const formatData = (data: any): labelValue => {
  return {
    label: data.name,
    value: data.id,
  };
};

export const getEditProjectFormDefaultValues = async (
  setFormDefaultValues: Dispatch<SetStateAction<formDefaultValues | null>>,
  projectDetails: projectApiDataItem,
  project_id?: number | null,
  resetDate?: string | null,
  isWorkStream?:boolean
) => {
  const noOfProjectsLinked = projectDetails?.sibling_projects?.length;

  // Checking if the project linked projects are not undefined and not Zero
  const projectsLinkedNo = noOfProjectsLinked
    ? noOfProjectsLinked > 0
      ? noOfProjectsLinked + 1
      : 1
    : 1;

  const topic = project_id
    ? isWorkStream
      ? `${projectDetails.topic} (Workstream of #${project_id})[${projectsLinkedNo}]`
      : `${projectDetails.topic} (Extension of #${project_id})[${projectsLinkedNo}]`
    : projectDetails.topic;

  const localDefaultValues: formDefaultValues = {
    topic,
    external_topic: projectDetails.external_topic,
    description: projectDetails.description || "",
    client_id: {
      value: projectDetails.client_id,
      label: projectDetails.client_name,
    },
    billing_office: projectDetails.billing_office_value
      ? formatData(projectDetails.billing_office_value)
      : null,
    customer: projectDetails?.client_contacts_value
      ? formatDataArr(projectDetails.client_contacts_value)
      : [],
    case_code: projectDetails?.case_code || [],
    no_of_calls: projectDetails?.no_of_calls?.toString() || "",
    priority: projectDetails?.priority || null,
    target_date:
      resetDate === "resetDate"
        ? LocalDayjs(new Date()).add(7, "days")
        : projectDetails?.target_date
        ? LocalDayjs(projectDetails.target_date)
        : null,
    receiving_date:
      resetDate === "resetDate"
        ? LocalDayjs(new Date())
        : LocalDayjs(projectDetails.receiving_date),
    client_geography: formatData(projectDetails?.geography_value) || [],
    expert_geographies:
      formatDataArr(projectDetails.expert_geographies_value) || [],
    account_manager:
      {
        value: projectDetails?.account_manager_value?.id,
        label: projectDetails?.account_manager_value.name || "",
      } || null,
    research_analysts:
      formatDataArr(projectDetails?.research_analysts_value) || [],
    l0_domain: {
      value: projectDetails?.l0_domain_value?.id,
      label: projectDetails?.l0_domain_value?.name,
    },
    l1_domain: {
      value: projectDetails?.l1_domain_value?.id,
      label: projectDetails?.l1_domain_value?.name,
    },
    l2_domain: {
      value: projectDetails?.l2_domain_value?.id,
      label: projectDetails?.l2_domain_value?.name,
    },
    l3_domain: projectDetails?.l3_domain_value
      ? formatData(projectDetails?.l3_domain_value)
      : null,
    domain_others: projectDetails?.domain_others?.split(", ") || [],
    functions: projectDetails?.functions?.split(", ") || [],
    target_companies: projectDetails?.target_companies?.split(", ") || [],
    fk_group: projectDetails?.fk_group || null,
    offlimit_topics: projectDetails?.offlimit_topics?.split(", ") || [],
    offlimit_companies: projectDetails?.offlimit_companies?.split(", ") || []
  };
  setFormDefaultValues(localDefaultValues);
};

export type payload = {
  description: string | null;
  topic: string;
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
  receiving_date: string; // Date in ISO 8601 format (e.g., "2022-12-31")
  billing_office: number | null;
  domain_others: string | null;
  client_contacts: number[] | null;
  case_code: string[] | null;
  target_date: string | null; // Date in ISO 8601 format (e.g., "2023-07-31")
  priority: string | null;
  no_of_calls: number;
  target_companies: string | null;
  fk_group: string | null;
};

export type Option = {
  label: string;
  value: string;
};
