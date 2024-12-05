import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import BasicDetailFields from "./fields";
import { basicDetailsFormSubmit } from "../helper";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";

const BasicDetailsForm = (props: any) => {
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, [])
    basicDetailsFormSubmit(
      newFormData,
      enqueueSnackbar,
      id,
      setFormChange,
      setFormDefaultValues,
      "basicDetails",
      setBackdropOpen
    );
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#3C3F48",
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <BasicDetailFields setFormChange={setFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default BasicDetailsForm;
