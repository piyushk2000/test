import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Fields from "./fiel";
import { addContactDefaultValues, defaultValues } from "./helper";
import { useEffect, useState } from "react";
import { RequestServer } from "../../../../utils/services";
import { APIRoutes } from "../../../../constants";
import { useSnackbar } from "notistack";
import Fields from "./fields";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  handleClose: () => void;
  setFormChange: () => void;
  handleSubmitClose: () => void;
  setBackdrop: (b: boolean) => void;
  id: string | null;
  isEdit?: boolean;
  contact_id?: number | null;
  formDefaultValues?: any;
};

const AddContactForm = ({
  handleClose,
  setFormChange,
  handleSubmitClose,
  setBackdrop,
  id,
  isEdit,
  contact_id,
  formDefaultValues
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({ defaultValues: isEdit ? formDefaultValues : defaultValues});

  const onSubmit = async (formData: addContactDefaultValues) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    const { name, email, designation, salutation } = newFormData;

    const isd_value = newFormData.isd_code?.value;
    const mobile = `${isd_value} ${newFormData.mobile}`;

    delete newFormData.isd_code;

    const payload: any = {
      action: isEdit ? "Edit" : "Add",
      name,
      email,
      designation,
      salutation: salutation.value,
      mobile,
      fkClient: id && parseInt(id),
      is_compliance_officer: formData.is_compliance_officer
    };

    if(isEdit && contact_id) {
      payload.id = contact_id;
    }

    try {
      setBackdrop(true);

      const method = isEdit ? "PATCH" : "POST";

      const response = await RequestServer( APIRoutes.clientContactUrl, method, payload);

      if (response.success) {
        enqueueSnackbar(response.message, {
          variant: "success",
        });
        handleSubmitClose();
      } else {
        console.log({ response });
        enqueueSnackbar(response.message.toString(), { variant: "warning" });
      }
    } catch (err) {
      console.error({ err });
      enqueueSnackbar("Request failed.", { variant: "error" });
    } finally {
      setBackdrop(false);
    }
  };

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat", "san-serif"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#EC9324",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields handleClose={handleClose} setFormChange={setFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AddContactForm;
