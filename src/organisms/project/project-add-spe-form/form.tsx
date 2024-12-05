import { FormProvider, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Fields from "./fields";
import { AddPEFormContext } from "./helper";
import { useContext } from "react";

const AddSPEForm = (props: any) => {
  const { onSubmit, handleClose } = props;
  const { selectedExpert } = useContext(AddPEFormContext);
  const defaultValues = {
    experts: []
  };

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
          <Fields handleClose={handleClose} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default AddSPEForm;
