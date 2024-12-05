import { DefaultValues, FormInputProps } from "./helper";
import { SubmitHandler } from "react-hook-form";
import ExpertForm from "../expert-form";
import { useSnackbar } from "notistack";
import { APIRoutes } from "../../constants";
import { RequestServer } from "../../utils/services";
import { isValidType } from "../../utils/isValidType";
import { useFullPageLoading } from "../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

type Props = {
  handleSubmitClose: () => void;
  handleClose: () => void;
  setChange?: () => void;
  mapped_project?: { label: string; value: number; } | null;
  refetch?:  (() => Promise<void>) | null;
  linkedinData?: any;
}

function AddExpertForm(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading: setFullPageLoading } = useFullPageLoading();

  const formDefaultValues = DefaultValues;
  formDefaultValues.mapped_project = props.mapped_project;
  // handle prefilling data
  const { linkedinData = null } = props;
  formDefaultValues.firstname = linkedinData?.name ? (linkedinData?.name.split(' '))[0] || "" : "";
  formDefaultValues.lastname = linkedinData?.name ? (linkedinData?.name.split(' ')).slice(1).join(' ') || "" : "";
  formDefaultValues.source_link = linkedinData?.source_link || "";

  const onSubmit: SubmitHandler<FormInputProps> = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const isd_code = newFormData?.isd_code?.value || "";
    const mobileNumber = newFormData.mobile_number
      ? isd_code + " " + newFormData.mobile_number
      : null;

      if(newFormData.mobile_number && !isd_code) {
        enqueueSnackbar("Include ISD code with mobile number.", {variant: "warning"});
        return;
      }

    // If Email ID or source_link are not valid, showing snackbar and returning from there
    if (newFormData.source_link && !isValidType(newFormData.source_link, "url")) {
      enqueueSnackbar("Invalid source link", { variant: "warning" });
      return;
    }


    const payload = {
      action: "Create",
      name: (newFormData?.firstname + " " + newFormData?.lastname),
      salutation: newFormData.name_salutations?.value || null,
      current_company_tag: newFormData.current_company.value,
      current_company: {
        name: newFormData.current_company_name,
        designation: newFormData.current_designation,
      },
      relevant_company: {
        name: newFormData.relevant_company_name,
        designation: newFormData.relevant_designation,
      },
      base_location: newFormData.current_base_location.value,
      type: newFormData.type_of_expert,
      primary_mobile: mobileNumber,
      source_link: newFormData.source_link,
      functions:
        newFormData.functions.length !== 0 ? newFormData.functions.join(", ") : null,
      offlimit_topics:
        newFormData.offlimit_topics.length !== 0 ? newFormData.offlimit_topics.join(", ") : null,
      offlimit_companies: 
        newFormData.offlimit_companies.length !== 0 ? newFormData.offlimit_companies.join(", ") : null,
      internal_notes: newFormData.internal_notes || null,
      note_visible_to_client: newFormData.remarks_visible_to_client || null,
      primary_email: newFormData.email || null,
      fk_project: newFormData.mapped_project?.value || null,
      referred_by: newFormData.referred_by?.value || null,
      domain_l0: newFormData.l0_domain?.value || null,
      domain_l1: newFormData.l1_domain?.value || null,
      domain_l2: newFormData.l2_domain?.value || null,
      domain_l3: newFormData.l3_domain?.value || null,
      domain_other: newFormData.other_domains.join(", ") || null,
      expertise_in_these_geographies: newFormData.expert_geographies.map(
        (geo: any) => geo.value
      ),
    };

    setFullPageLoading(true);

    try {
      const response = await RequestServer(
        APIRoutes.addExpert,
        "POST",
        payload
      );

      if (response.success) {
        enqueueSnackbar("Expert added.", {
          variant: "success",
        });

        // For Project Details - Refetch
        props.refetch && await props.refetch();
        props.handleSubmitClose();
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setFullPageLoading(false);
    }
  };

  return (
    <ExpertForm
      onSubmit={onSubmit}
      defaultValues={formDefaultValues}
      handleClose={props.handleClose}
      setChange={props.setChange}
      workExperienceList={linkedinData?.workExperience || []}
      isMapped={Boolean(props.mapped_project)}
    />
  );
}

export default AddExpertForm;
