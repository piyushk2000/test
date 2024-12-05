import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../../atoms/defaultFormTheme";
import { Fields } from "./fields";

type Props = {
    handleClose(): void;
    defaultValues: any;
    onSubmit: any;
}

const EditColumnForm = (props: Props) => {
  const { onSubmit, defaultValues, handleClose } = props;
  const methods = useForm({ defaultValues });
  const defaultTheme = createTheme(defaultFormTheme);

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

export default EditColumnForm;
