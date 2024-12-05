import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";
import { getCEMappingValues } from "../../../project-detail/helper";
import Fields from "./feilds";
import { ExpertSelectTypes, ExpertSelectDefault } from "./helper";
import { removeWhiteSpacesFromForm } from "../../../../utils/utils";

type Props = {
  experts:any[];
  id:string|null;  
  handleClose: () => void;
  handleSubmitClose: (val: any) => void;
};

const ScheduleCallExpert = ({experts,id, handleClose, handleSubmitClose }: Props) => {
  // const { refetch } = usePeMappingContext();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit: SubmitHandler<ExpertSelectTypes> = async (formData) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    handleSubmitClose(newFormData.expert);
  };

  const methods = useForm({ defaultValues: ExpertSelectDefault });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields experts={experts} handleClose={handleClose} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ScheduleCallExpert;
