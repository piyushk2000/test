import { FormProvider, useForm } from "react-hook-form";
import AddClientFields from "./fields";
import { AddClientDefaultValues, defaultValues } from "./helper";
import { useSnackbar } from "notistack";
import { RequestServer } from "../../utils/services";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { APIRoutes } from "../../constants";
import dayjs from "dayjs";
import { defaultFormTheme } from "../../atoms/defaultFormTheme";
import { removeWhiteSpacesFromForm } from "../../utils/utils";

const AddClientForm = (props: any) => {
  const methods = useForm({ defaultValues: (props?.isEdit && props?.clientData) ? props?.clientData : defaultValues });
  const { enqueueSnackbar } = useSnackbar();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (formData: AddClientDefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    setSubmitted(true);
    let payload: any = {
      action: props.isEdit ? "Update" : "Create",
      ...newFormData,
      type: newFormData?.type?.value,
      compliance_start_after: newFormData?.compliance_start_after?.value,
      compliance_end_before: newFormData?.compliance_end_before?.value || "Completed",
      compliance_email_format: newFormData?.compliance_email_format === "<p><br></p>" ? null : newFormData?.compliance_email_format,
      compliance_description: newFormData?.compliance_description === "<p><br></p>" ? null : newFormData?.compliance_description,
    };

    delete payload.CEM;

    if (newFormData.CEM) {
      payload.fk_cem = newFormData.CEM.value
    }

    payload.client_specific_compliance_requirement = "Not Required";

    if (props.isEdit) {
      payload["id"] = parseInt(props.id);
    }
    payload["contract_valid_till"] =
      newFormData.contract_valid_till ?
        dayjs(newFormData.contract_valid_till).format("YYYY-MM-DD") :
        null;

    props.setBackdrop(true);
    RequestServer(APIRoutes.clients, (props.isEdit ? "PATCH" : "POST"), payload)
      .then((data) => {
        if (data.success) {
          enqueueSnackbar(props.isEdit ? "Client Updated Successfully." : "Client Created Successfully.", {
            variant: "success",
          });
          setSubmitted(false);
          props.handleSubmitClose();
          props.refetchClientsData();
        } else {
          console.log({ data });
          enqueueSnackbar(data.message, { variant: "warning" });
        }
      })
      .catch((err) => {
        console.error({ err });
        setSubmitted(false);
        enqueueSnackbar("Request failed.", { variant: "error" });
      })
      .finally(() => {
        props.setBackdrop(false);
      });
  };


  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <AddClientFields {...props} submitting={submitted} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AddClientForm;
