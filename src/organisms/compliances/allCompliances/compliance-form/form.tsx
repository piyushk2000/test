import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fields from "./fields";
import { defaultFormTheme } from "../../../../atoms/defaultFormTheme";

type Props = {
  onSubmit: any,
  defaultValues: any,
  handleClose(): void,
  setChange(): void;
  isEdit: boolean;
}

const ComplianceForm = (props: Props) => {
  const { onSubmit, defaultValues, handleClose, setChange, isEdit } = props;

  const methods = useForm({ defaultValues });

  const defaultTheme = createTheme(defaultFormTheme);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <Fields
            handleClose={handleClose}
            setChange={setChange}
            isEdit={!!isEdit}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ComplianceForm;
