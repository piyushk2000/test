import { FormProvider, useForm } from "react-hook-form";
import AddCallLogsField from "./fields";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";

const CallLogForm = (props: any) => {
  const {
    onSubmit,
    defaultValues,
    handleClose,
    formOptions,
    handleFormChange,
    isEditForm,
    isViewForm,
    is_account_manager,
    is_group_admin,
    status
  } = props;

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <AddCallLogsField
            formOptions={formOptions}
            handleClose={handleClose}
            handleFormChange={handleFormChange}
            isEditForm={isEditForm}
            isViewForm={isViewForm}
            is_account_manager={is_account_manager}
            is_group_admin={is_group_admin}
            status={status}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default CallLogForm;
