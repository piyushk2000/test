import { defaultValues, payload } from "./helper";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../utils/services";
import ProjectForm from "../project-form/index";
import { APIRoutes } from "../../constants";
import { LocalDayjs } from "../../utils/timezoneService";
import { getProjectErrorMsg } from "../../pages/Projects/helper";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

const AddProjectForm = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading } = useFullPageLoading();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    let functions = newFormData.functions.join(", ");

    let domain_others =
      newFormData.domain_others.length === 0
        ? null
        : newFormData.domain_others.join(", ");

    let target_companies =
      newFormData.target_companies.length === 0
        ? null
        : newFormData.target_companies.join(", ");

    let offlimit_companies = 
      newFormData.offlimit_companies.length === 0
        ? null
        : newFormData.offlimit_companies.join(", ");

    let offlimit_topics =
      newFormData.offlimit_topics.length === 0
        ? null
        : newFormData.offlimit_topics.join(", ");

    let expert_geographies: number[] = newFormData.expert_geographies.map(
      (item: any) => item.value
    );

    const client_geography = newFormData.client_geography.value;

    let research_analysts = newFormData.research_analysts.map(
      (item: any) => item.value
    );

    const target_date = newFormData.target_date
      ? LocalDayjs(newFormData.target_date).format("YYYY-MM-DD")
      : null;

    const receiving_date = newFormData.receiving_date
      ? LocalDayjs(newFormData.receiving_date).toISOString()
      : null;

    const client_contacts =
      newFormData.customer.length === 0
        ? null
        : newFormData.customer.map((c: any) => c.value);

    delete newFormData.customer;

    let payload: payload = {
      action: "Create",
      account_manager: newFormData?.account_manager?.value,
      topic: newFormData?.topic,
      external_topic: newFormData?.external_topic,
      client_id: newFormData?.client_id?.value,
      description: newFormData?.description !== "<p><br></p>" ? newFormData?.description : null,
      functions: functions,
      target_companies,
      expert_geographies,
      client_geography,
      billing_office: newFormData.billing_office?.value || null,
      l0_domain: newFormData.l0_domain?.value || null,
      l1_domain: newFormData.l1_domain?.value || null,
      l2_domain: newFormData.l2_domain?.value || null,
      l3_domain: newFormData.l3_domain?.value || null,
      priority: newFormData.priority?.value || null,
      domain_others,
      research_analysts,
      target_date,
      receiving_date,
      case_code: newFormData.case_code.length === 0 ? null : newFormData.case_code,
      client_contacts,
      no_of_calls: parseInt(newFormData.no_of_calls),
      fk_group: newFormData.fk_group.value,
      offlimit_topics,
      offlimit_companies
    };

    setLoading(true);
    RequestServer(APIRoutes.projects, "POST", payload)
      .then((data) => {
        if (data.success) {
          enqueueSnackbar("Project created.", {
            variant: "success",
          });
          props.handleSubmitClose();
        } else {
          console.log({ data });
          const errorMessage = getProjectErrorMsg(data.message);
          enqueueSnackbar(errorMessage, { variant: "warning" });
        }
      })
      .catch((err) => {
        console.error({ err });
        enqueueSnackbar("Request failed.", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <ProjectForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      handleClose={props.handleClose}
      handleFormChange={props.handleFormChange}
    />
  );
};

export default AddProjectForm;
