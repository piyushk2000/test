import { useSnackbar } from "notistack";
import { APIRoutes } from "../../../constants";
import { RequestServer } from "../../../utils/services";
import { useEffect, useState } from "react";
import AddSPEForm from "./form";
import {
  AddPEFormContext,
  AddPEProps,
  formValues,
  getFormValues,
} from "./helper";
import { useFullPageLoading } from "../../../atoms/full-page-loading/loadingContext";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const returnAlternativeObject=(array:any[])=>{
  let str=`${array[0].value}`;
  array.forEach((val,i)=>{
    if(i>0){
      str+=','+val.value;
    }
  })
  return str
}

function AddSPE({
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

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    console.log(newFormData);
    const payload = {
      "fk_project": project_id, 
      "fk_expert_ids": returnAlternativeObject(newFormData.experts) 
    };

    setLoading(true);

    try {
      const response = await RequestServer(
        APIRoutes.ADD_STAGING,
        "POST",
        payload
      );
      if (response.success) {
        enqueueSnackbar("Expert staged.", {
          variant: "success",
        });
        handleSubmitClose();

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

  return (
    <AddPEFormContext.Provider
      value={{
        selectedExpert,
        isProjectField,
        handleChangeForm,
      }}
    >
      <AddSPEForm
        onSubmit={onSubmit}
        handleClose={handleClose}
      />
    </AddPEFormContext.Provider>
  );
}

export default AddSPE;
