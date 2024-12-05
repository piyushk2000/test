import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";

const AdminForm = (props: any) => {
  const { onSubmit, defaultValues, handleClose, isChange, isEdit } = props;

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields handleClose={handleClose} isChange={isChange} isEdit={isEdit} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AdminForm;
