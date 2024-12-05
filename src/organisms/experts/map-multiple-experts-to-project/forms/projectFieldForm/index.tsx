import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import Fields from "./fields";
import { useContext } from "react";
import { MapMultipleProjectContext } from "../../helper";

const ProjectFieldForm = () => {
  const { projectSelected } = useContext(MapMultipleProjectContext);
  const defaultValues = { project: projectSelected };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(() => {})} noValidate>
          <Fields />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ProjectFieldForm;
