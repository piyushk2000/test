import { FormProvider, useForm } from "react-hook-form";
import AddProjectFields from "./fields";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ProjectForm = (props: any) => {
  const { onSubmit, defaultValues, handleClose, handleFormChange, isLogExtension, isEditProject } = props;
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
          <AddProjectFields
            handleClose={handleClose}
            handleFormChange={handleFormChange}
            isLogExtension={isLogExtension}
            isEditProject={isEditProject}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ProjectForm;
