import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../../../../atoms/defaultFormTheme";
import {
  ZoomSetttingsFormDefault,
  ZoomSetttingsFormTypes,
} from "../../helper";
import { useSnackbar } from "notistack";
import { isValidType } from "../../../../../../../utils/isValidType";
import { removeWhiteSpacesFromForm } from "../../../../../../../utils/utils";

type Props = {
  handleClose: () => void;
  handleSubmitClose: (zoomSettings: any) => void;
  zoomSettings: ZoomSetttingsFormTypes;
};

const ZoomForm = ({ handleClose, handleSubmitClose, zoomSettings }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<ZoomSetttingsFormTypes> = async (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    let correct = true;
    const payload: any = { ...newFormData };


    if (newFormData.alternate_hosts?.length > 0) {
      newFormData.alternate_hosts.forEach(val => {
        if (!isValidType(val, 'email')) {
          enqueueSnackbar("Enter valid alternate host email", {
            variant: "warning",
          });
          correct = false
        }
      })
    }

    if (newFormData.compliance_officer?.length > 0) {
      newFormData.compliance_officer.forEach(val => {
        if (!isValidType(val, 'email')) {
          enqueueSnackbar("Enter valid compliance officer email", {
            variant: "warning",
          });
          correct = false
        }
      })
    }

    if (correct) {
      handleSubmitClose(payload);
    }
  };

  const methods = useForm({ defaultValues: zoomSettings || ZoomSetttingsFormDefault });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form noValidate>
          <Fields handleClose={handleClose} handleSubmitBtnClick={methods.handleSubmit(onSubmit)} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ZoomForm;
