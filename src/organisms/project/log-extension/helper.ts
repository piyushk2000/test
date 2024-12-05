import { Dispatch, SetStateAction } from "react";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import dayjs from "dayjs";
import { formDefaultValues } from "../../edit-project/helper";

export type PEExperts = PEMappedData & {
  checked: boolean;
};

export type PEMappedData = {
  fk_expert: number;
  expert_name: string;
  state: string;
};

type PEMappedResponse = {
  success: true;
  message: string;
  data: PEMappedData[];
};

export type SetExpertsState = Dispatch<SetStateAction<PEExperts[] | null>>;

export const getPEMappedExperts = async (
  id: number,
  setExperts: SetExpertsState
) => {
  try {
    const url =
      APIRoutes.peMapping +
      "?fk_project=" +
      id +
      "&show_columns=fk_expert,expert_name,state";
    const response: PEMappedResponse = await RequestServer(url, "GET");

    if (response.success) {
      const experts = response.data.map((prev) => ({
        ...prev,
        checked: false,
      }));
      setExperts(experts);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPayload = (
  formData: formDefaultValues,
  pe_expert_ids: string | null,
  id: number,
  isWorkStream: boolean
) => {
  let functions = formData.functions.join(", ");

  let domain_others =
    formData.domain_others.length === 0
      ? null
      : formData.domain_others.join(", ");

  let target_companies =
    formData.target_companies.length === 0
      ? null
      : formData.target_companies.join(", ");

  let expert_geographies: number[] = formData.expert_geographies.map(
    (item: any) => item.value
  );

  const client_geography = formData.client_geography.value;

  let research_analysts = formData.research_analysts.map(
    (item: any) => item.value
  );

  const target_date = formData.target_date
    ? dayjs(formData.target_date).format("YYYY-MM-DD")
    : null;

  const receiving_date = formData.receiving_date
    ? dayjs(formData.receiving_date).format("YYYY-MM-DD")
    : null;

  const client_contacts =
    formData.customer &&
    (formData.customer.length === 0
      ? null
      : formData.customer.map((c: any) => c.value));

  const priority =
    typeof formData.priority !== "string"
      ? formData.priority?.value
      : formData.priority;

  const fk_group =
    typeof formData.fk_group !== "string" ? formData.fk_group?.value : null;

  let payload: any = {
    action: "Create",
    account_manager: formData?.account_manager?.value,
    topic: formData?.topic,
    external_topic: formData?.external_topic,
    parent_project: id,
    client_id: formData?.client_id?.value,
    description: formData?.description,
    functions: functions,
    target_companies,
    expert_geographies,
    client_geography,
    billing_office: formData.billing_office?.value || null,
    l0_domain: formData.l0_domain.value,
    l1_domain: formData.l1_domain.value,
    l2_domain: formData.l2_domain.value,
    l3_domain: formData.l3_domain?.value || null,
    priority: priority || null,
    domain_others,
    research_analysts,
    target_date,
    receiving_date,
    case_code: formData.case_code.length === 0 ? null : formData.case_code,
    client_contacts,
    no_of_calls: parseInt(formData.no_of_calls),
    fk_group,
    type:isWorkStream?'Workstream':'Project',
  };

  // adding pe_expert_ids;
  if (pe_expert_ids) {
    payload.pe_expert_ids = pe_expert_ids;
  }

  return payload;
};
