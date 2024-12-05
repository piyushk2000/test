import { useSnackbar } from "notistack";
import { RequestServer } from "../../utils/services";
import ProjectForm from "../project-form/index";
import { Option, payload } from "./helper";
import { APIRoutes } from "../../constants";
import { useProjectDetailsContext } from "../../atoms/project-details/projectContext";
import { getprojectDetails } from "../project-detail/helper";
import { getAllProjects, getProjectErrorMsg, useProjectPageContext } from "../../pages/Projects/helper";
import { LocalDayjs } from "../../utils/timezoneService";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

const EditProjectForm = (props: any) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading, setDefaultValues } = useProjectDetailsContext();
  const { setData, filterPayload, setFilterPayload, setBookmarkedProjects, defaultFilterPayload } =
    useProjectPageContext();
  const { setLoading: setFullPageLoading } = useFullPageLoading();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    setLoading && setLoading(true);
    setFullPageLoading(true);
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

    let expert_geographies: Option[] = newFormData.expert_geographies.map(
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

    const client_contacts = newFormData.customer.map((c: any) => c.value);

    delete newFormData.customer;
    delete newFormData.account_manager_name;
    delete newFormData.billing_office_details;
    delete newFormData.client_name;
    delete newFormData.applicable_agenda_id;

    let payload: payload = {
      action: "Update",
      ...newFormData,
      client_id: newFormData.client_id.value,
      description: newFormData?.description !== "<p><br></p>" ? newFormData?.description : null,
      id: parseInt(props.id),
      functions: functions,
      target_companies,
      expert_geographies,
      client_geography,
      account_manager: newFormData?.account_manager?.value,
      billing_office: newFormData.billing_office?.value || null,
      l0_domain: newFormData.l0_domain.value,
      l1_domain: newFormData.l1_domain.value,
      l2_domain: newFormData.l2_domain.value,
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

    RequestServer(
      `${APIRoutes.projects}?id=${props.id.toString()}`,
      "PATCH",
      payload
    )
      .then((data) => {
        if (data.success) {
          enqueueSnackbar("Project updated.", {
            variant: "success",
          });

          props.setFormDefaultValues(null);
          props.handleSubmitClose();

          // For Project Details - Refetch
          setLoading &&
            getprojectDetails(setLoading, setDefaultValues, props.id, false);

          // For Project Cards - Refetch
          setData &&
            setBookmarkedProjects &&
            filterPayload &&
            setFilterPayload &&
            getAllProjects(
              1,
              setData,
              filterPayload,
              setBookmarkedProjects,
              setFilterPayload,
              defaultFilterPayload
            );
        } else {
          console.log({ data });
          const errorMessage = getProjectErrorMsg(data.message);
          enqueueSnackbar(errorMessage, { variant: "warning" });
          setLoading && setLoading(false);
        }
      })
      .catch((err) => {
        console.error({ err });
        enqueueSnackbar("Request failed.", { variant: "error" });
        setLoading && setLoading(false);
      }).finally(() => {
        setFullPageLoading(false);
      })
  };

  return (
    <ProjectForm
      onSubmit={onSubmit}
      defaultValues={props.defaultValues}
      handleClose={props.handleClose}
      handleFormChange={props.handleFormChange}
      isEditProject
    />
  );
};

export default EditProjectForm;
