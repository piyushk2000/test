import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ExpertFields from "./fields";

type Props = {
  onSubmit: any,
  defaultValues: any,
  handleClose: any,
  setChange?: any;
  isMapped?: boolean;
  isEdit?: boolean;
  workExperienceList?: any[];
}

const ExpertForm = (props: Props) => {
  const { onSubmit, defaultValues, handleClose, setChange, isEdit } = props;


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
          <ExpertFields
            handleClose={handleClose}
            setChange={setChange}
            isMapped={props.isMapped}
            workExperienceList={props?.workExperienceList || []}
            isEdit={isEdit}
          />
        </form>
      </ThemeProvider>
    </FormProvider>
  );
};

export default ExpertForm;
