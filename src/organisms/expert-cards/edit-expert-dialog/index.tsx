import ExpertForm from "../../expert-form";
import { useSnackbar } from "notistack";
import { FormInputProps } from "../../add-expert/helper";
import { useEffect, useState } from "react";
import { RequestServer } from "../../../utils/services";
import { APIRoutes } from "../../../constants";
import { CircularProgress } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import { isValidType } from "../../../utils/isValidType";
import { getDefaultValues } from "./helper";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

function EditExpertForm(props: any) {
  const { enqueueSnackbar } = useSnackbar();
  const { setLoading: setFullPageLoading } = useFullPageLoading();
  const [formDefaultValues, setFormDefaultValues] = useState<any>(null);
  const { id, getUpdatedExpertValues, setLoading, handleFormChange } = props;

  const onSubmit: SubmitHandler<FormInputProps> = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const isd_code = newFormData?.isd_code?.value || "";

    const mobileNumber = newFormData.mobile_number
      ? isd_code + " " + newFormData.mobile_number
      : null;


    if (newFormData.mobile_number && !isd_code) {
      enqueueSnackbar("Include ISD code with mobile number.", { variant: "warning" });
      return;
    }

    // If Email ID or source_link are not valid, showing snackbar and returning from there
    if (newFormData.source_link && !isValidType(newFormData.source_link, "url")) {
      enqueueSnackbar("Invalid source link", { variant: "warning" });
      return;
    }

    if (newFormData.email && !isValidType(newFormData.email, "email")) {
      enqueueSnackbar("Invalid email ID", { variant: "warning" });
      return;
    }

    const payload = {
      action: 'Update',
      id,
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
      base_location: newFormData?.current_base_location?.value,
      type: newFormData.type_of_expert,
      primary_mobile: mobileNumber,
      source_link: newFormData.source_link,
      functions:
        newFormData?.functions?.length !== 0
          ? newFormData.functions.join(", ")
          : null,
      internal_notes: newFormData.internal_notes || null,
      note_visible_to_client: newFormData.remarks_visible_to_client || null,
      primary_email: newFormData.email || null,
      fk_project: newFormData.mapped_project?.value || null,
      referred_by: newFormData.referred_by?.value || null,
      domain_l0: newFormData.l0_domain?.value || null,
      domain_l1: newFormData.l1_domain?.value || null,
      domain_l2: newFormData.l2_domain?.value || null,
      domain_l3: newFormData.l3_domain ? newFormData.l3_domain?.value : null,
      domain_other:
        newFormData.other_domains.length !== 0
          ? newFormData.other_domains.join(", ")
          : null,
      expertise_in_these_geographies: newFormData.expert_geographies.map(
        (geo: any) => geo.value
      ),
      offlimit_topics:
        newFormData.offlimit_topics.length !== 0 ? newFormData.offlimit_topics.join(", ") : null,
      offlimit_companies:
        newFormData.offlimit_companies.length !== 0 ? newFormData.offlimit_companies.join(", ") : null,
    };

    setFullPageLoading(true);
    try {
      const response = await RequestServer(
        APIRoutes.updateExpert,
        "PATCH",
        payload
      );

      if (response.success) {
        enqueueSnackbar("Expert updated.", {
          variant: "success",
        });
        props.handleSubmitClose();
        setLoading(true);
        getUpdatedExpertValues();
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

  useEffect(() => {
    getDefaultValues(id, setFormDefaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {formDefaultValues ? (
        <ExpertForm
          onSubmit={onSubmit}
          defaultValues={formDefaultValues}
          handleClose={props.handleClose}
          isEdit
          setChange={handleFormChange}
        />
      ) : (
        <CircularProgress
          sx={{
            marginTop: "1rem",
          }}
        />
      )}
    </>
  );
}

export default EditExpertForm;
