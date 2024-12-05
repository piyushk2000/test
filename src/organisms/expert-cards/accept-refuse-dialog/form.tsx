import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";

const AcceptRefuseForm = (props: any) => {
  const { onSubmit, defaultValues, handleClose, isComplianceDone, handleFormChange } = props;

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
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
          <Fields handleClose={handleClose} isComplianceDone={isComplianceDone} handleFormChange={handleFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AcceptRefuseForm;
