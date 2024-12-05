import { useSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { useEffect, useState } from "react";
import AddPEForm from "./form";
import {
  AddPEFormContext,
  AddPEProps,
  formValues,
  getFormValues,
} from "./helper";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

function AddPE({
  handleClose,
  project_id,
  handleSubmitClose,
  selectedExpert,
  isProjectField = false,
  handleChangeForm = () => { },
  isProjectDetails = () => { },
  refetch
}: AddPEProps) {
  const { setLoading } = useFullPageLoading();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any,  value: string) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const payload = {
      action: "Map",
      fk_project: project_id || newFormData.project?.value,
      fk_expert: newFormData.expert.value,
      fk_workex: newFormData.relevant_company.value,
      relevant_company: newFormData.relevant_company.company,
      relevant_designation: newFormData.relevant_company.designation,
      relevant_company_location: newFormData.relevant_company.location,
      relevant_division: newFormData.relevant_company.division || null,
      compliance_shared: false,
    };

    setLoading(true);

    try {
      const response = await RequestServer(
        APIRoutes.peMapping,
        "POST",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Expert added.", {
          variant: "success",
        });
        if (value == 'single') {
          handleSubmitClose();
        }

        /* IF this Form is in Project Details form , we have to refetch
        the project details , for that we are just changing a boolean
        which is triggering refetch in project details page
        */
        isProjectDetails();

        /* If we want to refetch something after expert got added */
        if (refetch) {
          refetch();
        }
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const submitFunction = (formData: any, value: string) => {
    onSubmit(formData, value);
  }

  return (
    <AddPEFormContext.Provider
      value={{
        selectedExpert,
        isProjectField,
        handleChangeForm,
      }}
    >
      <AddPEForm
        onSubmit={submitFunction}
        handleClose={handleClose}
      />
    </AddPEFormContext.Provider>
  );
}

export default AddPE;
