import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { basicDetailsFormSubmit, updateFields } from "../helper";
import { removeWhiteSpacesFromForm } from "../../../utils/utils";
import { defaultFormTheme } from "../../../atoms/defaultFormTheme";
import InternalInfoFields from "./fields";

const InternalInfoForm = (props: any) => {
  const {
    defaultValues,
    id,
    setFormChange,
    setFormDefaultValues,
    setBackdropOpen,
  } = props;
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (formData: any) => {
    const newFormData = removeWhiteSpacesFromForm(formData, []);

    const payload = {
      id,
      offlimit_topics: newFormData.offlimit_topics.join(", ") || null,
      offlimit_companies: newFormData.offlimit_companies.join(", ") || null,
      action: "InternalInfo",
      internal_notes: newFormData.internal_notes
    }
    await updateFields(
      payload,
      id,
      setBackdropOpen,
      enqueueSnackbar,
      setFormChange,
      setFormDefaultValues,
      "internal",
      "Internal Info Successfully Updated"
    );
  };

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <InternalInfoFields setFormChange={setFormChange} />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default InternalInfoForm;
