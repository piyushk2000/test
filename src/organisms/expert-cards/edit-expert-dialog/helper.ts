import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { FormInputProps } from "../../add-expert/helper";
import { formatData } from "../../../pages/Projects/helper";
import { CurrentCompany, RelevantCompany } from "../../expert-form/helper";
import { getPhoneISDValue } from "../../../utils/utils";

export const getDefaultValues = async (id: any, setFormDefaultValues: any) => {
  const response = await RequestServer(
    `${APIRoutes.getExpert}?id=${id}&embed=YES&stakeholders=YES`,
    "get"
  );

  const data = response.data[0];
  let referred_by_value = null;

  // getting referred_by name --------------------------------------------- //
  if (data?.referred_by) {
    const responseId = await RequestServer(
      `${APIRoutes.getExpert}?id=${data?.referred_by}&show_columns=name`,
      "get"
    );

    referred_by_value = {
      label: responseId.data[0].name,
      value: data?.referred_by,
    };
  }

  /* RELEVANT COMPANY TAG ------------------------------------------------- */
  const current_company = data?.meta?.current_company_tag || "";
  const current_company_name = data?.meta?.current_company?.name || "";
  const current_designation = data?.meta?.current_company?.designation || "";
  let relevant_company = "different";
  const relevant_company_name = data?.meta?.relevant_company?.name || "";
  const relevant_designation = data?.meta?.relevant_company?.designation || "";

  if (current_company === "working") {
    if (
      current_company_name === relevant_company_name &&
      current_designation === relevant_designation
    ) {
      relevant_company = "same";
    }
  }

  if (!relevant_company_name && !relevant_designation) {
    relevant_company = "";
  }

  const current_company_value =
    CurrentCompany.find((c) => c.value === current_company) || null;

  const relevant_company_value =
    RelevantCompany.find((r) => r.value === relevant_company) || null;

  // Phone Number --------------------------------------------------- //
  const { isd_code, primary_mobile: mobile_number } = getPhoneISDValue(
    data?.primary_mobile || ""
  );

  /* DEFAULT VALUES -------------------------------------------------- */

  const DefaultValues: FormInputProps = {
    name_salutations: data?.salutation
      ? {
          label: data.salutation,
          value: data.salutation,
        }
      : "",
    name: data?.name || "",
    firstname: (data?.name.split(' '))[0] || "",
    lastname: (data?.name.split(' ')).slice(1).join(' ') || "",
    current_base_location: data?.base_location_value
      ? {
          label: data?.base_location_value?.name,
          value: data?.base_location_value?.id,
        }
      : "",
    isd_code,
    mobile_number,
    email: data?.primary_email || "",
    source_link: data?.source_link || "",
    mapped_project: data?.fk_project_value
      ? {
          label: `ID: ${data?.fk_project_value?.id}, TOPIC: ${data?.fk_project_value.topic}`,
          value: data?.fk_project_value.id,
        }
      : "",
    current_company: current_company_value,
    current_company_name,
  
    current_designation,
    relevant_company: relevant_company_value,
    relevant_company_name,
    relevant_designation,
    expert_geographies: formatData(data?.expert_geographies_value) || null,
    l1_domain: data?.domain_l1_value
      ? {
          label: data.domain_l1_value.name,
          value: data.domain_l1_value.id,
        }
      : "",
    l2_domain: data?.domain_l2_value
      ? {
          label: data.domain_l2_value.name,
          value: data.domain_l2_value.id,
        }
      : "",
    l0_domain: data?.domain_l0_value
      ? {
          label: data.domain_l0_value.name,
          value: data.domain_l0_value.id,
        }
      : "",
    l3_domain: data?.domain_l3_value
      ? {
          label: data.domain_l3_value.name,
          value: data.domain_l3_value.id,
        }
      : "",
    other_domains: data?.domain_other ? data.domain_other.split(", ") : [],
    functions: data?.functions ? data.functions.split(", ") : [],
    internal_notes: data?.internal_notes || "",
    remarks_visible_to_client: data?.note_visible_to_client || "",
    type_of_expert: data?.type || null,
    is_referred: data.referred_by ? "yes" : "no",
    referred_by: referred_by_value,
    status: data?.status || "",
    offlimit_topics: data?.offlimit_topics?.split(",") || [],
    offlimit_companies: data?.offlimit_companies?.split(",") || [],
    updated_at: data?.updated_at || null,
    portal: data?.portal || ""
  };

  setFormDefaultValues(DefaultValues);
};
